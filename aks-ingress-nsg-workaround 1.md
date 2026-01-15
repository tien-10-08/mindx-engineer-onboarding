# Research Summary: Exposing AKS Services When Inbound Traffic Is Blocked

## Context
- Environment: Azure Kubernetes Service (AKS) with **AKS-managed VNet**
- Ingress: `ingress-nginx` with `LoadBalancer` service
- Domain: `nip.io` pointing to the ingress public IP
- Application: Runs in pod on `localhost:3000`, exposed via `Service` (`api:80`) and `Ingress`
- Issue: External access (browser/curl) **times out**

## Root Cause
- **Azure Network Security Group (NSG)** in the **Managed Resource Group (`MC_*`)** blocks inbound **TCP 80/443**
- User is **Owner of AKS resource** but **lacks Network permissions** on the managed RG
- Result: Internet traffic never reaches the ingress load balancer, despite correct Kubernetes config

## What Works (Verified)
- Internal access within cluster (`curl http://api:80`) succeeds
- Ingress rules and service-to-pod mapping are correct
- DNS resolution for `nip.io` is correct

## What Does Not Work
- Direct public access via:
  - `http://<public-ip>`
  - `http://api.<public-ip>.nip.io`
- Opening NSG via Azure Portal or Azure CLI (authorization denied)

## Constraints
- Cannot request admin intervention
- Cannot modify NSG in `MC_*` resource group
- Inbound traffic must remain blocked

## Solution: Outbound Tunnel from Inside the Cluster

### Approach
Use an **outbound tunnel** that runs **inside the cluster** to expose services publicly without opening inbound ports.

### Implementation (Cloudflare Quick Tunnel)
- Deploy a pod running `cloudflared` that tunnels outbound to Cloudflare
- Target the internal Kubernetes service (`api:80`)
- Cloudflare provides a public URL (`https://*.trycloudflare.com`)

### Commands
```bash
kubectl -n week1 create deployment api-tunnel \
  --image=cloudflare/cloudflared:latest \
  -- cloudflared tunnel --no-autoupdate --url http://api:80
```

Retrieve the public URL:
```bash
kubectl -n week1 logs deploy/api-tunnel --tail=300
```

### Result
- A public HTTPS URL is generated and accessible via browser
- Traffic flow:
  Browser → Cloudflare URL → cloudflared pod → `api` service → app on `localhost:3000`

## Trade-offs
- URL is ephemeral (changes on pod restart)
- Suitable for dev/demo/testing, not production
- No Azure network changes required

## Alternatives Considered
- Port-forward + local tunnel: requires local process
- NodePort / ExternalIP: blocked by NSG
- Using `nip.io`: requires inbound access (not possible)

## Conclusion
When inbound access to AKS is blocked and NSG cannot be modified, the only viable approach is to **initiate outbound connectivity from within the cluster**. Running an in-cluster tunnel (e.g., Cloudflare Quick Tunnel) provides a clean, self-contained workaround that enables external browser access without Azure network changes.
