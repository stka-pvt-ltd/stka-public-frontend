# STKA Pharmaceutical Admin API Mapping & Contract Matrix

This document defines the mapping between the Admin Frontend routes, features, and the Spring Boot backend API contracts.

## 1. Auth & Session Management

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| Admin Login | `/api/v1/auth/login` | `POST` | Public | `LoginRequest` (`emailOrPhone`, `password`) | `UserResponse` (`id`, `jwtToken`, `name`, `roles`) + `Set-Cookie` | `/admin/login` |
| Get User Details | `/api/v1/auth/user` | `GET` | User/Admin | None | `UserResponse` (`id`, `name`, `roles`) | Global Auth Check |
| Admin Logout | `/api/v1/auth/logout` | `POST` | User/Admin | None | `MessageResponse` + Clear Cookie | Sidebar Action |

---

## 2. Product Management

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List Products | `/api/v1/public/products` | `GET` | Public/Admin | Query Params (`pageNumber`, `pageSize`, `sortBy`, `sortOrder`) | `PageResponse<ProductResponse>` | `/admin/products` |
| Get Product | `/api/v1/admin/products/{id}` | `GET` | Admin | Path Param `id` (UUID) | `ProductResponse` | `/admin/products/$id` |
| Create Product | `/api/v1/admin/products` | `POST` | Admin | `ProductRequest` (JSON) | `ProductResponse` | `/admin/products/new` |
| Update Product | `/api/v1/admin/products/{id}` | `PUT` | Admin | `ProductRequest` (JSON) | `ProductResponse` | `/admin/products/$id` |
| Upload Product Images | `/api/v1/admin/products/{id}/images` | `POST` | Admin | `multipart/form-data` (`files`) | `ProductResponse` | `/admin/products/$id` |
| Delete Product | `/api/v1/admin/products/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table/Detail |

---

## 3. Category Management

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List Categories | `/api/v1/public/categories` | `GET` | Public/Admin | Query Params (`pageNumber`, `pageSize`, `sortBy`, `sortOrder`) | `PageResponse<CategoryResponse>` | `/admin/categories` |
| Get Category | `/api/v1/admin/categories/{id}` | `GET` | Admin | Path Param `id` (UUID) | `CategoryResponse` | Modal / Form |
| Create Category | `/api/v1/admin/categories` | `POST` | Admin | `CategoryRequest` (JSON) | `CategoryResponse` | Modal / Form |
| Update Category | `/api/v1/admin/categories/{id}` | `PUT` | Admin | `CategoryRequest` (JSON) | `CategoryResponse` | Modal / Form |
| Upload Category Image | `/api/v1/admin/categories/{id}/image` | `PUT` | Admin | `multipart/form-data` (`file`) | `CategoryResponse` | Modal / Form |
| Delete Category | `/api/v1/admin/categories/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table |

---

## 4. Company Information

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| Get Company Profile | `/api/v1/public/company` | `GET` | Public/Admin | None | `CompanyInformationResponse` | `/admin/company` |
| Create Profile Baseline | `/api/v1/admin/company` | `POST` | Admin | `CompanyInformationRequest` | `CompanyInformationResponse` | `/admin/company` |
| Update Company Profile | `/api/v1/admin/company` | `PUT` | Admin | `CompanyInformationRequest` | `CompanyInformationResponse` | `/admin/company` |
| Upload Company Logo | `/api/v1/admin/company/logo` | `PUT` | Admin | `multipart/form-data` (`file`) | `CompanyInformationResponse` | `/admin/company` |

---

## 5. Quality Certifications

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List Certifications | `/api/v1/public/certifications` | `GET` | Public/Admin | Query Params (`pageNumber`, `pageSize`, `sortBy`, `sortOrder`) | `PageResponse<CertificationResponse>` | `/admin/certifications` |
| Get Certification | `/api/v1/admin/certifications/{id}` | `GET` | Admin | Path Param `id` (UUID) | `CertificationResponse` | Modal / Form |
| Create Certification | `/api/v1/admin/certifications` | `POST` | Admin | `CertificationRequest` (JSON) | `CertificationResponse` | Modal / Form |
| Update Certification | `/api/v1/admin/certifications/{id}` | `PUT` | Admin | `CertificationRequest` (JSON) | `CertificationResponse` | Modal / Form |
| Upload Certificate Image | `/api/v1/admin/certifications/{id}/images` | `POST` | Admin | `multipart/form-data` (`files`) | `CertificationResponse` | Modal / Form |
| Delete Certification | `/api/v1/admin/certifications/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table |

---

## 6. Manufacturing Facilities

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List All Manufacturing | `/api/v1/admin/manufacturing` | `GET` | Admin | None | `List<ManufacturingResponse>` | `/admin/manufacturing` |
| Get Facility | `/api/v1/admin/manufacturing/{id}` | `GET` | Admin | Path Param `id` (UUID) | `ManufacturingResponse` | Modal / Form |
| Create Facility | `/api/v1/admin/manufacturing` | `POST` | Admin | `ManufacturingRequest` (JSON) | `ManufacturingResponse` | Modal / Form |
| Update Facility | `/api/v1/admin/manufacturing/{id}` | `PUT` | Admin | `ManufacturingRequest` (JSON) | `ManufacturingResponse` | Modal / Form |
| Toggle Facility Status | `/api/v1/admin/manufacturing/{id}/status` | `PATCH` | Admin | Query Param `active` (boolean) | `ManufacturingResponse` | Action in Table |
| Upload Facility Image | `/api/v1/admin/manufacturing/{id}/images` | `POST` | Admin | `multipart/form-data` (`file`) | `ManufacturingResponse` | Modal / Form |
| Delete Facility Image | `/api/v1/admin/manufacturing/{id}/images/{imageId}` | `DELETE` | Admin | Path Params `id`, `imageId` | `ManufacturingResponse` | Modal / Form |
| Delete Facility | `/api/v1/admin/manufacturing/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table |

---

## 7. Banners & Promotional Slides

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List All Banners | `/api/v1/admin/banners` | `GET` | Admin | None | `List<BannerResponse>` | `/admin/banners` |
| Get Banner | `/api/v1/admin/banners/{id}` | `GET` | Admin | Path Param `id` (UUID) | `BannerResponse` | Modal / Form |
| Create Banner | `/api/v1/admin/banners` | `POST` | Admin | `BannerRequest` (JSON) | `BannerResponse` | Modal / Form |
| Update Banner | `/api/v1/admin/banners/{id}` | `PUT` | Admin | `BannerRequest` (JSON) | `BannerResponse` | Modal / Form |
| Toggle Banner Status | `/api/v1/admin/banners/{id}/status` | `PATCH` | Admin | Query Param `active` (boolean) | `BannerResponse` | Action in Table |
| Upload Banner Image | `/api/v1/admin/banners/{id}/image` | `POST` | Admin | `multipart/form-data` (`file`) | `BannerResponse` | Modal / Form |
| Delete Banner Image | `/api/v1/admin/banners/{id}/image` | `DELETE` | Admin | Path Param `id` (UUID) | `BannerResponse` | Modal / Form |
| Delete Banner | `/api/v1/admin/banners/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table |

---

## 8. Jobs / Career Openings

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List All Jobs | `/api/v1/admin/jobs` | `GET` | Admin | Query Params (`pageNumber`, `pageSize`, `sortBy`, `sortOrder`) | `PageResponse<JobResponse>` | `/admin/jobs` |
| Get Job Opening | `/api/v1/admin/jobs/{id}` | `GET` | Admin | Path Param `id` (UUID) | `JobResponse` | Modal / Form |
| Create Job Opening | `/api/v1/admin/jobs` | `POST` | Admin | `JobRequest` (JSON) | `JobResponse` | Modal / Form |
| Update Job Opening | `/api/v1/admin/jobs/{id}` | `PUT` | Admin | `JobRequest` (JSON) | `JobResponse` | Modal / Form |
| Toggle Job Status | `/api/v1/admin/jobs/{id}/status` | `PATCH` | Admin | Query Param `active` (boolean) | `JobResponse` | Action in Table |
| Delete Job Opening | `/api/v1/admin/jobs/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Action in Table |

---

## 9. Customer & Career Enquiries

| Admin Feature | Backend Endpoint | Method | Auth | Request Type | Response Type | Frontend Route |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| List Enquiries | `/api/v1/admin/enquiries` | `GET` | Admin | Query Params (`status`, `pageNumber`, `pageSize`, `sortBy`, `sortOrder`) | `PageResponse<EnquiryResponse>` | `/admin/enquiries` |
| Get Enquiry Details | `/api/v1/admin/enquiries/{id}` | `GET` | Admin | Path Param `id` (UUID) | `EnquiryResponse` | Modal / Detail View |
| Update Enquiry Status | `/api/v1/admin/enquiries/{id}/status` | `PATCH` | Admin | Query Param `status` (`NEW`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`) | `EnquiryResponse` | Table / Detail Action |
| Download Attachment | `/api/v1/admin/enquiries/{id}/attachment` | `GET` | Admin | Path Param `id` (UUID) | Binary Stream (`application/pdf`) | Table / Detail Action |
| Delete Enquiry | `/api/v1/admin/enquiries/{id}` | `DELETE` | Admin | Path Param `id` (UUID) | `204 No Content` | Table Action |

