# 🎓 Công cụ Tính điểm Học phần

Một công cụ web nhẹ giúp sinh viên tính toán điểm tổng kết học phần theo thang điểm 10. Tài liệu này giữ nguyên cấu trúc mẫu README trước đó, nhưng đã cập nhật nội dung để phản ánh chính xác hành vi và tính năng hiện tại của mã nguồn trong repository.

---

## 📋 Table of Contents
- [✨ Tính năng chính](#-tính-năng-chính)
- [🚀 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [👨‍💻 Tác giả & Hoàn Thiện](#-tác-giả)
- [⚠️ Lưu ý (Disclaimer)](#️-lưu-ý-disclaimer)

---

## ✨ Tính năng chính

- Thêm / sửa / xóa các cột điểm: mỗi cột gồm Tên cột, Trọng số (%) và Điểm (thang 10). Giao diện có nút "Thêm Cột Điểm" và nút xóa cho từng cột.
- Trang bị một số cột mẫu khi khởi tạo (ví dụ: "Chuyên cần 1", "Chuyên cần 2", "Giữa kì 1", "Giữa kì 2", "Cuối kì", "Điểm khác"), người dùng có thể chỉnh sửa tên và giá trị.
- Tự động tính điểm tổng kết (hệ 10) theo công thức: tổng (điểm_i × trọng số_i / 100).
- Chuyển đổi sang điểm hệ 4 và điểm chữ theo ngưỡng nội bộ được định nghĩa trong mã nguồn.
- Kiểm tra quy tắc "điểm liệt" (nợ môn): khi bật công tắc "Điểm liệt (tự động kiểm tra)", nếu bất kỳ cột có tên chứa từ khóa dạng "giữa" (ví dụ: "giữa kì" hoặc phiên bản không dấu "giua ki") có điểm <= 1.0 thì khóa học sẽ bị đánh dấu "Nợ môn".
- Hiển thị cảnh báo / ghi chú khi tổng trọng số khác 100% (màu sắc hiển thị tổng trọng số cũng thay đổi tùy theo giá trị: <100%, =100%, >100%). Nếu tổng trọng số vượt quá 100% thì việc tính toán sẽ bị chặn và yêu cầu sửa lại.
- Kết quả được hiển thị trong một modal ở giữa màn hình gồm: Tổng trọng số, Điểm tổng kết (hệ 10), Điểm hệ 4, Điểm chữ, Xếp loại và Trạng thái (Qua môn / Nợ môn) kèm ghi chú.

---

## 🚀 Hướng dẫn sử dụng

1. Mở file `index.html` trong bất kỳ trình duyệt hiện đại nào (Chrome, Edge, Firefox). Không cần cài đặt server.

2. Nhập/điền các cột điểm:
  - Mỗi cột gồm: Tên Cột, Trọng số (%) và Điểm (thang 10). Điểm có thể là số thập phân như 8.5.
  - Dùng nút "Thêm Cột Điểm" để thêm cột mới. Dùng nút xóa để gỡ cột không cần thiết.
  - Gợi ý: kiểm tra tổng trọng số (hiển thị ở góc dưới form). Mục tiêu là tổng trọng số = 100% để kết quả chính xác.

3. Kiểm tra tính năng "Điểm liệt":
  - Bật công tắc "Điểm liệt (tự động kiểm tra)" nếu bạn muốn công cụ tự kiểm tra các cột có tên chứa "giữa".
  - Nếu một cột chứa từ khóa "giữa" (hoặc không dấu "giua") và điểm của cột đó <= 1.0 thì kết quả cuối cùng sẽ được gán trạng thái "Nợ môn".

4. Bấm nút "Tính toán Kết quả" để mở modal hiển thị kết quả chi tiết.

5. Các lưu ý khi sử dụng:
  - Nếu tổng trọng số < 100% công cụ vẫn tính và hiển thị ghi chú cảnh báo.
  - Nếu tổng trọng số > 100% công cụ sẽ cảnh báo và yêu cầu chỉnh sửa trước khi chấp nhận kết quả.

---

## 🛠️ Công nghệ sử dụng

| Technology | Mô tả |
|-----------:|:------|
| HTML5 | Cấu trúc trang và biểu mẫu nhập liệu |
| Tailwind CSS (CDN) | Tạo giao diện responsive, hiện đại (sử dụng CDN của Tailwind) |
| Vanilla JavaScript | Xử lý logic: thêm/xóa cột, tính toán điểm, kiểm tra điều kiện liệt và hiển thị modal |
| Google Fonts (Inter) | Phông chữ Inter để hiển thị chữ đẹp và nhất quán |

---

## 👨‍💻 Tác giả

Phát triển ban đầu bởi **Hoan IT**. 
Các chỉnh sửa phù hợp cho sinh viên Phenikaa được thực hiện bởi **Thạc Nguyễn Đình Vũ/Kenn** - Sinh viên Phenikaa University khóa K15 Công nghệ thông tin.

---

## ⚠️ Lưu ý (Disclaimer)

Công cụ này chỉ phục vụ tham khảo và hỗ trợ học tập. Kết quả chính thức phải được xác nhận bởi hệ thống và văn phòng nhà trường.

---


---

## English — Quick overview

This is a lightweight web tool for calculating course final scores on a 10-point scale. The Vietnamese section above describes the full usage and behavior; this English summary highlights the main features and how the app works.

- Editable score components: each component has a Name, Weight (%) and Score (0–10). You can add or remove components using the UI.
- The app initializes with sample components (for example: "Chuyên cần 1", "Chuyên cần 2", "Giữa kì 1", "Giữa kì 2", "Cuối kì", "Điểm khác"). You can rename or update them.
- Final score (10-point scale) is computed as: sum(score_i × weight_i / 100).
- The tool converts the final 10-point score to a 4-point scale and a letter grade according to thresholds defined in the JavaScript logic.
- "Fail by exam" rule (optional): when the "fail check" toggle is enabled, any component whose name contains the keyword "giữa" (or non-accented "giua") and has a score ≤ 1.0 will cause the course to be marked as failed ("Nợ môn").
- Weight validation: the UI shows the current total weight and colors it depending on value (<100%, =100%, >100%). If total weight > 100% calculation is blocked and user must fix weights.
- Results are shown in a centered modal and include: total weight, final score (10), converted 4-point score, letter grade, classification and final status (Pass / Fail) plus notes.

How to run:
1. Open `index.html` in a modern browser (Chrome, Edge, Firefox). No server required.
2. Edit or add components, set weights and scores, toggle the fail-check option if needed.
3. Click "Tính toán Kết quả" (Calculate Results) to view the modal with computed results.

License / Note: this project is open-source and intended for educational/reference purposes; official course records must be verified with the university.


