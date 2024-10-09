import React, { useEffect, useState } from 'react';
import './Booking.css'; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Hàm tải danh sách đặt lịch
  const loadBookings = async () => {
    try {
      const response = await fetch('http://192.168.1.15/api/getlichhen.php');
      if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách đặt lịch');
      }
      const data = await response.json();
      setBookings(data);
      setFilteredBookings(data); // Khởi tạo filteredBookings giống bookings
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải danh sách đặt lịch. Vui lòng kiểm tra kết nối hoặc dữ liệu.');
    }
  };

  // Hàm tìm kiếm đặt lịch
  const searchBookings = async (searchTerm) => {
    try {
      const response = await fetch(`http://172.20.10.6/api/timkiemlichhen.php?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Lỗi khi tìm kiếm đặt lịch');
      }
      const data = await response.json();
      setFilteredBookings(data); // Cập nhật filteredBookings với kết quả tìm kiếm
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      alert('Không thể tìm kiếm. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBookings(bookings); // Nếu ô tìm kiếm rỗng, hiển thị tất cả đặt lịch
    } else {
      searchBookings(searchTerm); // Gọi hàm tìm kiếm đặt lịch
    }
  }, [searchTerm, bookings]);

  return (
    <div id="bookings" className="booking-content-section">
      <div className="bookings-header-section">
        <h2>Danh sách lịch hẹn</h2>

        {/* Thanh tìm kiếm với icon */}
        <div className="bookings-search-container">
          <i className="fas fa-search bookings-search-icon"></i>
          <input
            type="text"
            placeholder="Tìm kiếm lịch hẹn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bookings-search-input"
          />
        </div>
      </div>

      <div id="bookingsTable">
        {filteredBookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID Lịch Hẹn</th>
                <th>Tên Người Dùng</th>
                <th>Tên Thú Cưng</th>
                <th>Tên Dịch Vụ</th>
                <th>Ngày Hẹn</th>
                <th>Thời Gian Hẹn</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.idlichhen}>
                  <td>{booking.idlichhen}</td>
                  <td>{booking.tennguoidung}</td>
                  <td>{booking.tenthucung}</td>
                  <td>{booking.tendichvu}</td>
                  <td>{booking.ngayhen}</td>
                  <td>{booking.thoigianhen}</td>
                  <td>{booking.trangthai}</td>
                  <td>{booking.ngaytao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có đặt lịch nào</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
