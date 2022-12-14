import { baseService } from "./baseService";
export class UserManagementService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };

  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };

  getDanhSachNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02`);
  };

  postThemNguoiDung = (user) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, user);
  };
  deleteUser = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
  postCapNhapThongTinNguoiDung = (user) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
  };
}

export const userManagementService = new UserManagementService();
