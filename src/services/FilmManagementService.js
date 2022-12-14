import { baseService } from "./baseService";

export class FilmManagementService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
  };

  getDanhSachPhim = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`);
  };

  deleteMovie = (maPhim) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };

  themPhimUploadHinh = (movieObj) => {
    const formData = new FormData();
    for (const key in movieObj) {
      formData.append(key, movieObj[key]);
    }
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  };

  capNhatPhimUpload = (movie) => {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };
}
export const filmManagementService = new FilmManagementService();
