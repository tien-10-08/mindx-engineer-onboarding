# Environment Variables Setup

## 📋 Tổng quan

Frontend sử dụng environment variables để cấu hình API URL. Có 2 cách setup:

### ✅ Cách 1: Relative Path (Khuyến nghị cho Production)
**Không cần `.env` file** - Frontend tự động dùng `/api` (relative path)

### ✅ Cách 2: Absolute URL (Cho Local Development)
**Cần `.env` file** - Set `VITE_API_BASE_URL=http://localhost:3000/api`

---

## 🏠 Local Development

### Tạo file `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Lý do:** Khi dev local, frontend chạy ở `localhost:5173` và backend ở `localhost:3000`, cần absolute URL.

---

## 🚀 Production (Kubernetes/AKS)

### Không cần `.env` file!

**Lý do:** 
- Frontend và API cùng domain qua Ingress
- Frontend: `https://your-domain.com/`
- API: `https://your-domain.com/api/`
- Dùng relative path `/api` sẽ tự động dùng cùng domain

### Cách hoạt động:

1. **Ingress routing:**
   - Frontend: `/` → `week1-frontend-service`
   - API: `/api/*` → `week1-api-service`

2. **Frontend code:**
   - Nếu không có `VITE_API_BASE_URL` → dùng `/api` (relative)
   - Browser tự động resolve thành `https://your-domain.com/api`

3. **Kết quả:**
   - Frontend gọi `/api/auth/login`
   - Browser resolve thành `https://your-domain.com/api/auth/login`
   - Ingress route đến backend service

---

## 📝 Setup Checklist

### Local Development:
- [ ] Tạo `frontend/.env` với `VITE_API_BASE_URL=http://localhost:3000/api`
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd frontend && npm run dev`

### Production Build:
- [ ] **KHÔNG** tạo `.env` file (hoặc đảm bảo không có `VITE_API_BASE_URL`)
- [ ] Build Docker image: `docker build -t frontend:latest .`
- [ ] Deploy lên Kubernetes
- [ ] Frontend tự động dùng `/api` (relative path)

---

## 🔧 Build Docker Image

### Option 1: Không có .env (Recommended)

```bash
cd frontend
docker build -t frontend:latest .
```

Frontend sẽ tự động dùng `/api` khi không có env var.

### Option 2: Build với env var (nếu cần)

```bash
cd frontend
docker build \
  --build-arg VITE_API_BASE_URL=https://api.example.com/api \
  -t frontend:latest .
```

**Lưu ý:** Chỉ dùng khi API ở domain khác với frontend.

---

## 🎯 Best Practice

### ✅ DO:
- **Local:** Dùng `.env` với `VITE_API_BASE_URL=http://localhost:3000/api`
- **Production:** Không set `VITE_API_BASE_URL`, dùng relative path `/api`
- **Same domain:** Luôn dùng relative path

### ❌ DON'T:
- **Không** hardcode `localhost` trong code
- **Không** commit `.env` file lên Git
- **Không** dùng absolute URL khi frontend và API cùng domain

---

## 🐛 Troubleshooting

### Lỗi: `ERR_CONNECTION_REFUSED` khi deploy

**Nguyên nhân:** Frontend đang dùng `localhost:3000` trong production

**Giải pháp:**
1. Xóa file `frontend/.env` (hoặc không set `VITE_API_BASE_URL`)
2. Rebuild Docker image
3. Redeploy

### Lỗi: `404 Not Found` khi gọi API

**Nguyên nhân:** Ingress routing chưa đúng

**Giải pháp:**
1. Kiểm tra Ingress config: `/api/*` route đến `week1-api-service`
2. Kiểm tra backend service đang chạy
3. Test: `curl https://your-domain.com/api/health`

---

## 📚 Tóm tắt

| Environment | VITE_API_BASE_URL | Kết quả |
|-------------|-------------------|---------|
| Local Dev | `http://localhost:3000/api` | ✅ Absolute URL |
| Production | Không set (hoặc empty) | ✅ Relative path `/api` |
| Production (different domain) | `https://api.example.com/api` | ✅ Absolute URL |

**Code tự động chọn:**
- Có `VITE_API_BASE_URL` → Dùng absolute URL
- Không có → Dùng relative path `/api`

