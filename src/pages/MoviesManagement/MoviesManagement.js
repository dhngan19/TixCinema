import React, { useEffect, useState, useRef } from "react";
import { useStyles, DialogContent, DialogTitle } from "./styles";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import slugify from "slugify";
import RenderCellExpand from "./RenderCellExpand";
import Action from "./Action";
import Dialog from "@material-ui/core/Dialog";
import Form from "./Form";

import {
  deleteMovie,
  getMovieListManagement,
  resetMoviesManagement,
  themPhimUploadHinhAction,
  updateMovieUpload,
} from "../../redux/actions/FilmManagementAction";
import ThumbnailYoutube from "./ThumbnailYoutube";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <CircularProgress style={{ margin: "auto" }} />
    </GridOverlay>
  );
}
export default function MoviesManagement() {
  const [movieListDisplay, setMovieListDisplay] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const newImageUpdate = useRef("");
  const callApiChangeImageSuccess = useRef(false);
  const { enqueueSnackbar } = useSnackbar();
  const clearSetSearch = useRef(0);
  const [openModal, setOpenModal] = React.useState(false);
  const selectedPhim = useRef(null);
  const dispatch = useDispatch();
  let {
    arrFilmDefault,
    loadingUpdateMovie,
    successAddUploadMovie,
    successUpdateMovie,
    errorUpdateMovie,
    errorAddUploadMovie,
    loadingAddUploadMovie,
    loadingMovieList,
    loadingDeleteMovie,
    errorDeleteMovie,
    successDeleteMovie,
  } = useSelector((state) => state.FilmManagementReducer);

  useEffect(() => {
    if (
      arrFilmDefault ||
      successUpdateMovie ||
      successDeleteMovie ||
      errorDeleteMovie ||
      successAddUploadMovie
    ) {
      dispatch(getMovieListManagement());
    }
  }, [
    successUpdateMovie,
    successDeleteMovie,
    errorDeleteMovie,
    successAddUploadMovie,
  ]); // khi v???a th??m phim m???i xong m?? x??a li??n backend s??? b??o l???i x??a kh??ng ???????c nh??ng th???c ch???t ???? x??a th??nh c??ng > errorDeleteMovie nh??ng v???n ti???n h??nh l??m m???i l???i danh s??ch

  useEffect(() => {
    return () => {
      dispatch(resetMoviesManagement());
    };
  }, []);
  useEffect(() => {
    if (arrFilmDefault) {
      let newMovieListDisplay = arrFilmDefault.map((movie) => ({
        ...movie,
        hanhDong: "",
        id: movie.maPhim,
      }));
      setMovieListDisplay(newMovieListDisplay);
    }
  }, [arrFilmDefault]);

  useEffect(() => {
    if (successUpdateMovie) {
      callApiChangeImageSuccess.current = true;
      enqueueSnackbar(
        `Update th??nh c??ng phim: ${successUpdateMovie.tenPhim ?? ""}`,
        { variant: "success" }
      );
    }
    if (errorUpdateMovie) {
      callApiChangeImageSuccess.current = false;
      enqueueSnackbar(`${errorUpdateMovie ?? ""}`, { variant: "error" });
    }
  }, [successUpdateMovie, errorUpdateMovie]);
  useEffect(() => {
    if (successAddUploadMovie) {
      enqueueSnackbar(
        `Th??m th??nh c??ng phim: ${successAddUploadMovie.tenPhim}`,
        {
          variant: "success",
        }
      );
    }
    if (errorAddUploadMovie) {
      enqueueSnackbar(errorAddUploadMovie, { variant: "error" });
    }
  }, [successAddUploadMovie, errorAddUploadMovie]);

  useEffect(() => {
    // delete movie xong th?? th??ng b??o
    if (successDeleteMovie) {
      enqueueSnackbar(successDeleteMovie, { variant: "success" });
      return;
    }
    if (errorDeleteMovie) {
      enqueueSnackbar(errorDeleteMovie, { variant: "error" });
    }
  }, [successDeleteMovie, errorDeleteMovie]);

  // x??a m???t phim
  const handleDeleteOne = (maPhim) => {
    if (!loadingDeleteMovie) {
      // n???u click x??a li??n t???c m???t user
      dispatch(deleteMovie(maPhim));
    }
  };
  const handleEdit = (phimItem) => {
    selectedPhim.current = phimItem;
    setOpenModal(true);
  };
  const onUpdate = (movieObj) => {
    if (loadingUpdateMovie) {
      return undefined;
    }
    setOpenModal(false);

    dispatch(updateMovieUpload(movieObj));
  };
  const onAddMovie = (movieObj) => {
    if (!loadingAddUploadMovie) {
      dispatch(themPhimUploadHinhAction(movieObj));
    }
    setOpenModal(false);
  };

  const handleAddMovie = () => {
    const emtySelectedPhim = {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      danhGia: 10,
    };
    selectedPhim.current = emtySelectedPhim;
    setOpenModal(true);

    //trong obj movie c?? key hinhAnh l?? file n??n ph???i chuy???n sang formData
  };

  const handleInputSearchChange = (props) => {
    clearTimeout(clearSetSearch.current);
    clearSetSearch.current = setTimeout(() => {
      setValueSearch(props);
    }, 500);
  };

  const onFilter = () => {
    // d??ng useCallback, slugify b??? d???u ti???ng vi???t
    let searchMovieListDisplay = movieListDisplay.filter((movie) => {
      const matchTenPhim =
        slugify(movie.tenPhim ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMoTa =
        slugify(movie.moTa ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchNgayKhoiChieu =
        slugify(movie.ngayKhoiChieu ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return matchTenPhim || matchMoTa || matchNgayKhoiChieu;
    });
    if (newImageUpdate.current && callApiChangeImageSuccess.current) {
      // hi???n th??? h??nh b???ng base64 thay v?? url, l???i react kh??ng hi???n th??? ????ng h??nh m???i c???p nh???t(???? c???p h??nh thanh c??ng nh??ng url backend tr??? v??? gi??? nguy??n ???????ng d???n)
      searchMovieListDisplay = searchMovieListDisplay.map((movie) => {
        if (movie.maPhim === newImageUpdate.current.maPhim) {
          return { ...movie, hinhAnh: newImageUpdate.current.srcImage };
        }
        return movie;
      });
    }
    return searchMovieListDisplay;
  };

  const classes = useStyles();
  const columns = [
    {
      field: "tenPhim",
      headerName: "T??n Phim",
      width: 250,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "trailer",
      headerName: "Trailer",
      width: 130,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: "inline-block" }}>
          <ThumbnailYoutube urlYoutube={params.row.trailer} />
        </div>
      ),
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "hinhAnh",
      headerName: "H??nh ???nh",
      type: "number",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => RenderCellExpand(params),
    },
    {
      field: "moTa",
      headerName: "M?? T???",
      width: 200,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      renderCell: RenderCellExpand,
    },
    {
      field: "ngayKhoiChieu",
      headerName: "Ng??y kh???i chi???u",
      width: 190,
      type: "date",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      valueFormatter: (params) => params.value.slice(0, 10),
    },
    {
      field: "danhGia",
      headerName: "????nh gi??",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    { field: "maPhim", hide: true, width: 130 },
    { field: "maNhom", hide: true, width: 130 },
    { field: "biDanh", hide: true, width: 200, renderCell: RenderCellExpand },
    {
      field: "hanhDong",
      headerName: "H??nh ?????ng",
      width: 150,
      renderCell: (params) => (
        <Action
          onEdit={handleEdit}
          onDeleted={handleDeleteOne}
          phimItem={params.row}
        />
      ),
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
  ];

  const modifySlugify = { lower: true, locale: "vi" };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className={classes.control}>
        <div className="row">
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search???"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addMovie}
              onClick={handleAddMovie}
              disabled={loadingAddUploadMovie}
              startIcon={<AddBoxIcon />}
            >
              th??m phim
            </Button>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        pageSize={25}
        // checkboxSelection
        rowsPerPageOptions={[10, 25, 50]}
        // hi???n loading khi
        loading={loadingUpdateMovie || loadingDeleteMovie || loadingMovieList}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: GridToolbar,
        }}
        getRowId={(row) => row.maPhim}
      />
      <Dialog open={openModal}>
        <DialogTitle onClose={() => setOpenModal(false)}>
          {selectedPhim?.current?.tenPhim
            ? `S???a phim: ${selectedPhim?.current?.tenPhim}`
            : "Th??m Phim"}
        </DialogTitle>
        <DialogContent dividers>
          <Form
            selectedPhim={selectedPhim.current}
            onUpdate={onUpdate}
            onAddMovie={onAddMovie}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
