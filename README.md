# G-Score Frontend — Next.js Admin Dashboard

Đây là **frontend Admin Dashboard** cho hệ thống G-Score — ứng dụng tra cứu và thống kê điểm thi THPT Quốc gia 2024.  
Được xây dựng bằng **Next.js 16**, **Ant Design**, **TanStack Query** và **Zustand**.

---

## Tech Stack

| Thành phần   | Công nghệ                          |
|--------------|------------------------------------|
| Framework    | Next.js 16 (App Router, TypeScript)|
| UI Library   | Ant Design 6 + Ant Design Icons    |
| Styling      | Tailwind CSS 4                     |
| Data Fetching| TanStack React Query v5 + Axios    |
| Charts       | Recharts 3                         |
| State        | Zustand 5                          |
| Forms        | React Hook Form + Zod validation   |
| Deployment   | Docker, Fly.io                     |

---

## Tính năng

| Trang            | Mô tả                                                                 |
|------------------|-----------------------------------------------------------------------|
| **Dashboard**    | Hiển thị top 10 thí sinh khối A (Toán + Lý + Hóa) dạng bảng         |
| **Check Score**  | Tra cứu điểm toàn bộ môn thi theo số báo danh                        |
| **Report**       | Biểu đồ phân phối điểm 4 mức (≥8, 6–8, 4–6, <4) theo từng môn      |

### Giao diện
- Sidebar điều hướng với collapse/expand
- Responsive: Sidebar chuyển thành Drawer overlay trên mobile
- Header hiển thị trạng thái Admin

---

## Yêu cầu môi trường

- **Node.js** >= 20
- **npm** >= 10
- Backend API ([G_SCORE_nestjs](../G_SCORE_nestjs/)) đang chạy

---

## Chạy Local (Development)

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd G_SCORE_nextjs
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

> Nếu backend chạy ở port khác, thay đổi giá trị tương ứng.

### 3. Khởi động dev server

```bash
npm run dev
```

Ứng dụng chạy tại: **http://localhost:3000**

### 4. Truy cập

Mở trình duyệt và điều hướng đến một trong các trang:
- `/dashboard` — Top thí sinh khối A
- `/check-score` — Tra cứu theo SBD
- `/report` — Biểu đồ thống kê

---

## Cấu trúc thư mục

```
src/
├── app/
│   ├── (admin)/                # Route group — giao diện admin
│   │   ├── layout.tsx          # Layout chung: Sidebar + Header
│   │   ├── dashboard/          # Trang top thí sinh khối A
│   │   ├── check-score/        # Trang tra cứu điểm
│   │   └── report/             # Trang biểu đồ thống kê
│   ├── layout.tsx              # Root layout (AntD Registry)
│   └── page.tsx                # Redirect về /dashboard
├── components/
│   └── pages/                  # Page-level components
├── services/                   # Axios API service functions
├── providers/                  # TanStack Query provider
├── store/                      # Zustand stores
├── types/                      # TypeScript type definitions
├── helpers/                    # Utility functions
└── configs/                    # App configuration (API URL, ...)
```

---

## Build Production

```bash
npm run build
npm start
```

---

## Docker

```bash
# Build image
docker build -t g-score-frontend .

# Chạy container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL="https://g-score-backend.fly.dev" \
  g-score-frontend
```

---

## Deploy lên Fly.io

```bash
# Lần đầu tiên
fly launch

# Deploy
fly deploy

# Xem logs
fly logs
```

**Cấu hình Fly.io** (`fly.toml`):
- App name: `g-score-frontend`
- Region: Singapore (`sin`)
- Port: `3000`
- RAM: 512MB, 1 shared CPU
- Build arg: `NEXT_PUBLIC_API_BASE_URL` được truyền lúc build

> **Quan trọng:** Biến `NEXT_PUBLIC_*` được nhúng vào bundle lúc build (Next.js),  
> nên phải truyền qua `[build.args]` trong `fly.toml`, không dùng `fly secrets`.

---

## Lint

```bash
npm run lint
```

---

## Demo

🌐 **Live:** https://g-score-frontend.fly.dev

---

## License

Private — Dự án học tập / intern assignment.
