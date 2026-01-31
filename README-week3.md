# Week 3: Ticket Handling & Professional Communication

Complete documentation for ticket handling workflow, professional communication, and MindX 7-step process through 6 realistic support scenarios.

---

## 📊 Overview

Week 3 focuses on mastering ticket handling workflow in Odoo and professional communication skills through hands-on practice with real-world scenarios:

- **Ticket Management**: Odoo workflow, classification, and documentation
- **Professional Communication**: Email drafts, stakeholder management, expectation setting
- **MindX Framework**: 7-step process and Class of Service classification
- **Real Scenarios**: 6 practice scenarios covering different ticket types and complexities

---

## 🔧 MindX 7-Step Process

The MindX framework for ticket handling consists of 7 key steps:

### 1. Reception
- Log ticket in Odoo system (within 15 minutes)
- Capture all relevant details (customer, issue description, priority)
- Classify by Class of Service
- Apply appropriate tags and categories

### 2. Initial Response
- Acknowledge the request within 30 minutes
- Set realistic expectations
- Provide temporary workarounds if available
- Request additional information if needed

### 3. Diagnosis
- Investigate the issue using available tools (monitoring, logs, system checks)
- Gather additional information from customer if needed
- Identify root cause or potential causes
- Document findings

### 4. Resolution
- Apply fix or workaround
- Escalate to appropriate team if needed
- Document all actions taken
- Verify solution works

### 5. Communication
- Update customer and stakeholders regularly (every 24 hours or as needed)
- Provide progress updates even when no new information
- Explain technical issues in accessible language
- Set and manage expectations

### 6. Follow-up
- Confirm with customer that solution worked
- Verify no additional issues
- Ask for feedback
- Close ticket only after confirmation

### 7. Trend Analysis
- Document patterns for future improvement
- Create knowledge base articles
- Share learnings with team
- Update runbooks and procedures

---

## 📋 Class of Service Framework

Class of Service determines how tickets are prioritized and handled:

| Class          | Users Affected | Treatment                    | Priority Level |
| -------------- | -------------- | ---------------------------- | -------------- |
| **Standard**   | < 5            | Normal priority              | Low/Medium     |
| **Priority**  | 5-25           | Expedited handling           | High           |
| **Expedite**  | > 25           | Emergency response           | Urgent         |
| **Fixed Deadline** | Any        | Time-driven                  | High/Urgent    |

### Classification Guidelines

- **Standard**: Single user issues, feature requests, non-urgent problems
- **Priority**: Multiple users affected (5-25), business impact, blocking work
- **Expedite**: Large-scale outages (>25 users), critical business functions down
- **Fixed Deadline**: Time-sensitive requests (reports, presentations, deadlines)

---

## 📁 Week 3 Scenarios

### Scenario 1: Login Issue (Standard)

**Class of Service:** Standard (< 5 users)  
**Ticket #:** 3  
**Customer:** Teacher Nguyễn Văn A (nguyen.van.a@mindx.edu.vn)

#### Issue Summary
- **Problem**: Cannot login to LMS system
- **Error**: "Invalid username or password"
- **Impact**: 1 user (teacher needs access to class materials)
- **Urgency**: Class happening today

#### Ticket Timeline

**Jan 29, 3:33 PM** - Ticket created  
**Jan 29, 3:36 PM** - Assigned to Đỗ Doãn Tiến  
**Jan 29, 3:36 PM** - Priority changed: Low → Medium  
**Jan 29, 3:37 PM** - Customer: nguyen.van.a@mindx.edu.vn  
**Jan 29, 3:41 PM** - Priority changed: Medium → Urgent

**Jan 29, 4:36 PM** - Initial Response (Email ACK sent)
- Acknowledged login issue
- Provided temporary workarounds (incognito mode, check URL, browser)
- Set expectation: response within 30 minutes
- Next step: Check Base system for account status

**Jan 29, 4:38 PM** - Stage: New → In Progress

**Jan 29, 4:40 PM** - Diagnosis Completed
- Base System Check (Assumed):
  - Account status: Active ✓
  - Nhân sự status: Đang làm việc ✓
  - Email: nguyen.van.a@mindx.edu.vn (verified) ✓
  - Last update: 2 weeks ago
  - Login attempts: 3 failed attempts in last 10 minutes
- **Root Cause**: Password issue (likely forgotten or changed)
- **Resolution Plan**: Reset password and send temporary password via email

**Jan 29, 4:41 PM** - Resolution Applied
- Actions taken:
  1. Accessed Base system (assumed)
  2. Reset password for account: nguyen.van.a@mindx.edu.vn
  3. Generated temporary password: TempPass123!@#
  4. Password reset email sent to customer

**Jan 29, 4:44 PM** - Resolution Email sent
- Subject: RE: Không thể đăng nhập vào LMS - Đã xử lý - Ticket #3
- Content:
  - Solution applied: Password reset
  - New login credentials provided
  - Instructions: Login with temp password, change password immediately
  - Security notes included

**Jan 29, 4:45 PM** - Customer Confirmation Received
- Customer response (assumed):
  - Successfully logged in with temporary password
  - Changed password as instructed
  - Can now access class materials
  - Issue resolved
- Status: Ready to close ticket

**Jan 29, 4:45 PM** - Ticket Closed

#### Key Learnings
- Standard class tickets require timely but not emergency response
- Password reset is common solution for login issues
- Always verify account status before taking action
- Security best practices: temporary passwords, immediate change requirement

---

### Scenario 2: Performance Problem (Priority)

**Class of Service:** Priority (5-25 users)  
**Ticket #:** 8  
**Customer:** Coordinator Hà (coordinator.ha@mindx.edu.vn)

#### Issue Summary
- **Problem**: Severe performance degradation for class WEB101-HN-2024
- **Impact**: 15 students + 1 CXO blocked
- **Symptoms**: Page load time > 1 minute (normal: ~2 seconds), cannot submit assignments
- **Urgency**: Class in progress

#### Ticket Timeline

**Jan 29, 4:50 PM** - Ticket created  
**Jan 29, 4:50 PM** - Customer: coordinator.ha@mindx.edu.vn  
**Jan 29, 4:50 PM** - Priority: Low → Urgent  
**Jan 29, 4:50 PM** - Assigned to Đỗ Doãn Tiến

**Jan 29, 4:52 PM** - Stage: New → In Progress

**Jan 29, 4:52 PM** - Initial Response (Email ACK sent)
- Acknowledged urgent performance issue
- 15 students affected, class in progress
- Committed to update every 15 minutes
- Provided temporary workarounds
- Next step: Start investigation (Azure App Insights, logs, system health)

**Jan 29, 4:53 PM** - Investigation Started
- Checking:
  1. Azure App Insights - Response time analysis
  2. Application logs - Error patterns
  3. System health - Database, cache, API
- Focus: Class WEB101-HN-2024 specific issues

**Jan 29, 4:53 PM** - Diagnosis Completed
- Azure App Insights (Assumed):
  - Response time spike from 14:00 (2s → 35s)
  - Pattern: Only class WEB101-HN-2024 affected
  - Other classes: Normal performance
  - Affected endpoints: /assignments/submit, /class/web101/content
- Application Logs (Assumed):
  - Multiple TimeoutException errors
  - SlowQueryWarning: Queries taking 28-32s
  - Pattern: All related to class_id=WEB101-HN-2024
  - Error frequency: ~10 errors/minute
- System Health (Assumed):
  - Database connection pool: 85/100 (85% full)
  - Query queue: 15 pending
  - Active connections: 82
  - Cache: Normal (no issues)
- **Root Cause Analysis**:
  - Database connection pool near capacity
  - Slow queries on class WEB101 data
  - Possible causes:
    1. Missing database index on class_id
    2. Inefficient query for class WEB101
    3. Database connection pool needs expansion
- **Decision**: Escalate to Dev Team
  - Issue requires code/database fix
  - Outside support team scope
  - Need query optimization or pool expansion

**Jan 29, 4:54 PM** - Escalated to Dev Team
- Escalation Details:
  - Issue: Performance degradation for class WEB101-HN-2024
  - Impact: 15 students blocked, class in progress
  - Root cause: Database connection pool + slow queries
  - Monitoring: Azure App Insights shows 35s response time
  - Logs: TimeoutException pattern, slow queries detected
- Dev Team notified via Teams
- Waiting for response and fix
- Customer will be updated in next email

**Jan 29, 4:54 PM** - Update #1 sent to customer
- Content:
  - Investigation findings shared
  - Escalation to Dev Team communicated
  - Temporary workarounds provided
  - Next update scheduled: 14:45

**Jan 29, 4:55 PM** - Issue Resolved
- Dev Team Actions (Assumed):
  - Added database index on class_id
  - Optimized query for class WEB101 data
  - Expanded connection pool: 100 → 150
- Verification:
  - Response time: Back to normal (~2s) ✓
  - Tested assignment submission: Working ✓
  - Monitoring: No more timeout errors ✓
  - Performance: Normal for all classes ✓
- Next: Send resolution email to customer

**Jan 29, 4:55 PM** - Resolution Email sent
- Subject: RE: Khẩn cấp - Lớp học đang gặp tình trạng chậm nghiêm trọng - Đã xử lý - Ticket #8
- Content:
  - Issue resolved confirmation
  - Root cause and fix explained
  - Verification results shared
  - Next steps for customer
  - Monitoring commitment

**Jan 29, 4:56 PM** - Customer Confirmation Received
- Customer response (assumed):
  - Confirmed issue resolved
  - Students can now access and submit assignments
  - Performance back to normal
  - No further issues reported
- Status: Ready to close ticket

**Jan 29, 4:56 PM** - Ticket Closed
- Summary:
  - Issue: Performance degradation for class WEB101-HN-2024
  - Users affected: 15 students + 1 CXO
  - Root cause: Database connection pool + slow queries
  - Resolution: Dev Team optimized queries and expanded pool
  - Time to resolve: ~45 minutes
  - Class of Service: Priority (15 users, 5-25 range)
  - Escalation: Yes (Dev Team)
  - Customer satisfaction: Confirmed resolved ✓

#### Key Learnings
- Priority tickets require frequent updates (every 15 minutes)
- Proper investigation before escalation saves time
- Escalation should include full context and technical details
- Performance issues often require Dev Team involvement
- Monitoring tools (Azure App Insights) are critical for diagnosis

---

### Scenario 3: Critical Bug (Expedite)

**Class of Service:** Expedite (> 25 users)  
**Focus:** Emergency response, stakeholder management

#### Issue Summary
- **Problem**: Student submission system completely down
- **Impact**: 50+ students from multiple classes cannot submit final exams
- **Affected Classes**:
  - WEB102-HN (20 students)
  - DATA101-SG (18 students)
  - MOBILE201-HN (15 students)
- **Error**: "System error - please contact administrator"
- **Urgency**: Critical - final exams in progress

#### Key Characteristics
- **Expedite Class Criteria Met:**
  - ✅ > 25 users affected (50+)
  - ✅ Critical business function (exams)
  - ✅ System completely down
  - ✅ Multiple stakeholders

#### Expected Workflow
1. **Immediate Recognition** (< 2 minutes)
   - Identify as Expedite class
   - Activate emergency protocol

2. **Emergency Response** (< 5 minutes)
   - Acknowledge to all stakeholders
   - Alert Dev Team immediately
   - Update ticket in Odoo as Expedite

3. **Information Gathering** (< 10 minutes)
   - Check monitoring and logs
   - Identify error patterns
   - Determine scope

4. **Escalation & Coordination** (< 15 minutes)
   - Escalate to Dev Team with full context
   - Coordinate with multiple teams
   - Update stakeholders frequently

5. **Stakeholder Management**
   - Manager: Technical details minimized, focus on business impact
   - CXO: Acknowledge issue, communicate fix plan/temporary solution

6. **Resolution & Verification**
   - Test after Dev Team fix
   - Verify across multiple classes
   - Monitor short-term after fix

7. **Post-Incident**
   - Document incident fully
   - Collect data for post-mortem
   - Participate in incident review
   - Document for future Expedite responses

#### Common Mistakes to Avoid
- ❌ Delaying escalation by analyzing too long
- ❌ Forgetting to update stakeholders
- ❌ Too much technical detail for non-technical stakeholders
- ❌ Trying to handle everything alone
- ❌ Announcing fix too early (before verification)

---

### Scenario 4: Feature Request (Standard)

**Class of Service:** Standard  
**Ticket #:** 10  
**Customer:** CXO Cơ sở Nguyễn Chí Thanh (cxo@company.com)

#### Issue Summary
- **Request**: Auto-generate PDF progress reports and email to parents weekly
- **Requester**: CXO Cơ sở Nguyễn Chí Thanh
- **Impact**: Would save team time (as stated by requester)
- **Type**: Feature request (not bug/issue)

#### Ticket Timeline

**Jan 29, 5:15 PM** - Ticket created  
**Jan 29, 5:18 PM** - Assigned to Đỗ Doãn Tiến  
**Jan 29, 5:18 PM** - Priority: Low → Medium  
**Jan 29, 5:18 PM** - Customer: cxo@company.com

**Jan 29, 5:20 PM** - Stage: New → In Progress

**Jan 29, 5:20 PM** - Initial Response (Email ACK sent)
- Acknowledged feature request
- Explained Product Team evaluation process
- Set realistic expectations (no specific timeline)
- Provided temporary workarounds if needed
- Next: Forward to Product Team for evaluation

**Jan 29, 5:20 PM** - Feature Request Evaluation
- Request Type: Feature Request (not bug/issue)
- Feature: Auto-generate PDF progress reports and email to parents weekly
- Requester: CXO Cơ sở Nguyễn Chí Thanh
- Impact: Would save team time (as stated by requester)
- Assessment:
  - Outside Support team scope
  - Requires Product Team evaluation
  - No immediate timeline available
  - Need to forward to Product Team
- Decision: Forward to Product Team for roadmap evaluation

**Jan 29, 5:20 PM** - Forwarded to Product Team
- Action:
  - Ticket forwarded to Product Team for evaluation
  - Product Team will assess:
    * Technical feasibility
    * Priority in product roadmap
    * Impact and value
    * Implementation timeline (if approved)
- Next: Wait for Product Team response
- Customer will be updated when Product Team provides feedback

**Jan 29, 5:21 PM** - Update sent to customer
- Content:
  - Feature request forwarded to Product Team
  - Evaluation timeline provided (2-4 weeks)
  - Next steps explained
  - Customer will be updated when Product Team responds

**Jan 29, 5:21 PM** - Product Team Response Received (Assumed)
- Product Team Assessment:
  - Feature request evaluated
  - Added to product backlog
  - Priority: Medium
  - Timeline: Will be considered in Q2/Q3 roadmap
  - Status: Under review
- Next: Update customer with Product Team feedback

**Jan 29, 5:22 PM** - Follow-up Email sent
- Content:
  - Product Team feedback shared
  - Feature added to backlog
  - Timeline provided (Q2/Q3 roadmap)
  - Customer thanked for feedback
  - Ticket will remain open for future updates

**Jan 29, 5:22 PM** - Ticket Status Update
- Summary:
  - Issue: Feature Request - Auto PDF reports and email to parents
  - Requester: CXO Cơ sở Nguyễn Chí Thanh
  - Status: Forwarded to Product Team
  - Product Team: Added to backlog, priority Medium
  - Timeline: Q2/Q3 roadmap consideration
  - Class of Service: Standard (1 user request)
- Ticket status: ON HOLD (waiting for Product Team roadmap decision)
- Note: Ticket will remain open for future Product Team updates

**Jan 30, 5:23 PM** - Stage: In Progress → On Hold

#### Key Learnings
- Feature requests are outside Support scope - forward to Product Team
- Set realistic expectations (no promises on timeline)
- Keep customer engaged even when request is deferred
- Ticket remains open for future updates
- Professional communication when "saying no" or deferring

---

### Scenario 5: Multi-User Issue (Priority)

**Class of Service:** Priority (5-25 users)  
**Ticket #:** 20 (merged from #19 and #20)  
**Customer:** Teacher 01 (teacher01@mindx.edu.vn)

#### Issue Summary
- **Problem**: Video bài 3 Advanced JavaScript không load được
- **Class**: JS-ADV-HN-2412 (Advanced JavaScript)
- **Impact**: 12 students affected
- **Symptoms**: Video loading indefinitely, some see "Cannot load media" error
- **Devices**: Both web (Chrome 120+) and mobile (iOS Safari/Android Chrome) affected
- **Time Started**: Around 19:40

#### Ticket Timeline

**Jan 29, 5:30 PM** - Ticket created  
**Jan 29, 5:30 PM** - Customer: teacher01@mindx.edu.vn  
**Jan 29, 5:31 PM** - Priority: Low → Medium  
**Jan 29, 5:33 PM** - Tickets #19 and #20 merged into this one

**Jan 29, 5:42 PM** - Stage: New → In Progress

**Jan 29, 5:42 PM** - ACK sent to primary reporter
- Confirmed receipt and Priority handling
- Requested additional info: lesson link, screenshot, device details
- Provided workaround: incognito mode, disable adblock, try different browser

**Jan 29, 5:42 PM** - Internal team notified via Teams
- Alerted tech-team, devops-team, content-ops-team
- Provided incident summary and current status
- Requested standby for potential escalation

**Jan 29, 5:43 PM** - Diagnosis started
- Accessing Azure App Insights Live Metrics
- Filtering: /api/video/* and /api/lessons/* endpoints
- Time range: 19:40 to present

**Jan 29, 5:44 PM** - App Insights findings
- GET /api/lessons/adv-js-lesson-3/video → 403 Forbidden
- Error spike started at 19:40
- Error rate: 100% for this endpoint (12/12 requests failed)
- Other lessons: No errors detected

**Jan 29, 5:44 PM** - CDN Logs checked
- Video file "adv-js-03-async.mp4" → Access Denied
- CDN URL: https://cdn.mindx.edu.vn/videos/adv-js-03-async.mp4
- Pattern: All requests return 403, regardless of user device/network

**Jan 29, 5:44 PM** - Scope confirmed
- Only lesson 3 affected
- Other lessons in same course: OK
- Other courses: OK
- System-wide: No issues detected

**Jan 29, 5:44 PM** - Pattern analysis
- All 12 users affected
- Not device-specific (both web and mobile fail)
- Not network-specific (WiFi and 4G both fail)
- Consistent error: 403 Forbidden

**Jan 29, 5:45 PM** - Hypothesis formed
- Most likely: Signed URL expired
- Alternative: Permission/ACL changed on storage
- Less likely: File moved/deleted accidentally

**Jan 29, 5:46 PM** - Diagnosis completed
- **Root cause identified**: 403 Forbidden (signed URL expired or permission issue)
- Update email sent to reporter with findings
- Escalating to DevOps and Content Ops

**Jan 29, 5:47 PM** - Escalated to DevOps and Content Ops
- Sent escalation email with full technical details
- Provided: lesson ID, asset ID, error codes, monitoring data
- Requested: check file existence, permission, regenerate signed URL
- Status: Waiting for DevOps response

**Jan 29, 5:48 PM** - DevOps response received
- Confirmed: signed URL expired
- Action: Regenerating signed URL
- ETA: 5 minutes

**Jan 29, 5:48 PM** - DevOps update
- Signed URL regenerated successfully
- System updated with new URL
- Ready for verification

**Jan 29, 5:50 PM** - Verification request sent to sample users
- Sent to student01@example.com
- Requested: test video playback and confirm
- Waiting for user confirmation

**Jan 29, 5:50 PM** - User verification received
- student01@example.com: Confirmed video working
- CXO: All students confirmed OK
- Verification: Successful

**Jan 29, 5:51 PM** - Trend Analysis
- Issue Type: Video asset permission/URL expiry
- Frequency: First occurrence for this lesson
- Pattern: Single lesson affected, not system-wide
- Prevention measures:
  1. Monitoring alert for URL expiry (to be implemented)
  2. Runbook created for similar issues
  3. Escalation path documented
- Related tickets: None (first time)
- Future prevention: Alert setup in progress

**Jan 29, 5:56 PM** - Stage: In Progress → Solved

**Jan 30, 6:04 PM** - Stage: In Progress → Ready

#### Key Learnings
- Multi-user issues require ticket merging/grouping
- Pattern analysis helps identify root cause
- 403 errors often indicate permission/URL expiry issues
- Verification with sample users before closing
- Trend analysis and prevention measures important

---

### Scenario 6: Deadline Request (Fixed Deadline)

**Class of Service:** Fixed Deadline  
**Ticket #:** 22  
**Customer:** Director (director@mindx.edu.vn)

#### Issue Summary
- **Request**: Enrollment report for Director presentation
- **Deadline**: 09:00 AM tomorrow (hard deadline)
- **Requirements**: 
  - Filter by location + program + time period
  - Breakdown by course
- **Risks**: PII data, heavy query, unclear metrics

#### Ticket Timeline

**Jan 29, 6:02 PM** - Ticket created  
**Jan 29, 6:03 PM** - Stage: New → In Progress  
**Jan 29, 6:03 PM** - Priority: Low → High  
**Jan 29, 6:03 PM** - Assigned to Đỗ Doãn Tiến

**Jan 29, 6:07 PM** - Ticket created - Fixed Deadline request
- Request from: Director
- Deadline: 09:00 AM tomorrow (hard deadline)
- Initial scope: Enrollment report with filters and breakdown
- Risks identified: PII data, heavy query, unclear metrics
- Status: New → In Progress
- Next: Send ACK with clarifying questions

**Jan 29, 6:09 PM** - ACK sent to Director with clarifying questions
- Requested clarification on: time period, data fields, scope priority, format, breakdown details
- Emphasized: MVP approach to meet deadline
- Mentioned: Approval needed if PII data required
- Status: In Progress - Awaiting response

**Jan 29, 6:10 PM** - Scope and timeline proposed to Director
- MVP scope: All locations, all programs, Jan 2025 to present
- Metrics: Enrollment count, Revenue, Course breakdown
- Format: Excel with 2 sheets (Summary + Detail)
- Timeline: Start 08:00 today, Draft 17:00 today, Final 09:00 tomorrow
- Risks: Large query may take time, mitigation plan provided
- Status: In Progress - Awaiting scope confirmation

**Jan 29, 6:11 PM** - Scope confirmed by Director
- Approved MVP scope and timeline
- Starting data extraction now
- Status: In Progress - Data extraction in progress

**Jan 29, 6:12 PM** - Data extraction started
- Querying enrollment data from database
- Time range: 01/01/2025 to present
- Scope: All locations, all programs
- Estimated time: 2-3 hours

**Jan 29, 6:13 PM** - Progress update sent to Director
- Data extraction: Completed
- Data processing: In progress
- ETA for draft: 17:00 today
- Status: In Progress - On track

**Jan 30, 6:15 PM** - Final report delivered to Director
- File: Enrollment_Report_Final_20250116.xlsx
- Deadline: 09:00 AM today ✅ COMPLETED ON TIME
- Status: Resolved
- Director confirmed: No additional changes needed

**Jan 30, 6:15 PM** - Post-mortem notes
- Request type: Fixed Deadline - Data export/reporting
- Deadline: 09:00 AM (hard deadline)
- Resolution time: 24 hours (from request to delivery)
- Key success factors:
  - Clear scope clarification upfront
  - MVP approach to meet deadline
  - Regular progress updates
  - Early draft for review
- Lessons learned:
  - Fixed deadline requests need immediate scope clarification
  - MVP approach helps meet tight deadlines
  - Early draft allows for feedback and adjustments
- Recommendation:
  - Document template for similar reporting requests
  - Create runbook for data export requests
  - Setup approval workflow for PII data access
- Tags for reporting: fixed-deadline, reporting, data-export, director-request

**Jan 30, 6:15 PM** - Stage: In Progress → Solved

**Jan 30, 6:33 PM** - Stage: In Progress → Ready

#### Key Learnings
- Fixed deadline requests require immediate scope clarification
- MVP approach essential for tight deadlines
- Regular progress updates critical
- Early draft allows for feedback and adjustments
- PII data requires approval workflow
- Post-mortem documentation important for future similar requests

---


**Last Updated**: Week 3 Completion  
**Maintained By**: MindX Engineer Onboarding Team
