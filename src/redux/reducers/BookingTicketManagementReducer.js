import {
  BOOK_TICKET_REQUEST,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAIL,
  GET_LISTSEAT_REQUEST,
  GET_LISTSEAT_SUCCESS,
  GET_LISTSEAT_FAIL,
  CHANGE_LISTSEAT,
  RESET_DATA_BOOKTICKET,
  SET_DATA_PAYMENT,
  SET_READY_PAYMENT,
  TIMEOUT,
  SET_ISMOBILE,
  SET_STEP,
  INIT_DATA,
  RESET_ALERT_OVER10,
  SET_ALERT_OVER10,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  CREATE_SHOWTIME_FAIL,
  RESET_CREATE_SHOWTIME,
} from "../actions/types/BookingTicketManagementType";

const initialState = {
  loadingGetListSeat: false,
  danhSachPhongVe: {},
  errorGetListSeatMessage: null,
  listSeat: [],
  isSelectedSeat: false,
  listSeatSelected: [],
  danhSachVe: [],
  amount: 0,

  timeOut: false,
  isMobile: false,
  refreshKey: Date.now(),

  maLichChieu: null,
  taiKhoanNguoiDung: null,

  alertOver10: false,


  email: "",
  phone: "",
  paymentMethod: "",
  isReadyPayment: false,
  activeStep: 0,


  loadingBookingTicket: false,
  successBookingTicketMessage: null,
  errorBookTicketMessage: null,


  loadingCreateShowtime: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,
};

const BookingTicketManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTSEAT_REQUEST: {
      return {
        ...state,
        loadingGetListSeat: true,
        errorGetListSeatMessage: null,
      };
    }
    case GET_LISTSEAT_SUCCESS: {
      return {
        ...state,
        danhSachPhongVe: action.payload.data,
        loadingGetListSeat: false,
      };
    }
    case GET_LISTSEAT_FAIL: {
      return {
        ...state,
        errorGetListSeatMessage: action.payload.error,
        loadingGetListSeat: false,
      };
    }
    case INIT_DATA: {
      return {
        ...state,
        listSeat: action.payload.listSeat,
        maLichChieu: action.payload.maLichChieu,
        taiKhoanNguoiDung: action.payload.taiKhoanNguoiDung,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    }
    case CHANGE_LISTSEAT: {
      return {
        ...state,
        listSeat: action.payload.listSeat,
        isSelectedSeat: action.payload.isSelectedSeat,
        listSeatSelected: action.payload.listSeatSelected,
        danhSachVe: action.payload.danhSachVe,
        amount: action.payload.amount,
      };
    }
    case RESET_DATA_BOOKTICKET: {
      return {
        ...state,
        danhSachPhongVe: {},
        paymentMethod: "",
        isReadyPayment: false,
        isSelectedSeat: false,
        listSeatSelected: [],
        timeOut: false,
        activeStep: 0,
        danhSachVe: [],
        successBookingTicketMessage: null,
        errorBookTicketMessage: null,
        refreshKey: Date.now(),
        amount: 0,
        alertOver10: false,
      };
    }
    case SET_DATA_PAYMENT: {
      return {
        ...state,
        email: action.payload.email,
        phone: action.payload.phone,
        paymentMethod: action.payload.paymentMethod,
      };
    }
    case SET_READY_PAYMENT: {
      return {
        ...state,
        isReadyPayment: action.payload.isReadyPayment,
      };
    }
    case SET_STEP: {
      return {
        ...state,
        activeStep: action.payload.activeStep,
      };
    }
    case RESET_ALERT_OVER10: {
      return {
        ...state,
        alertOver10: false,
      };
    }
    case SET_ALERT_OVER10: {
      return {
        ...state,
        alertOver10: true,
      };
    }
    case BOOK_TICKET_REQUEST: {
      return {
        ...state,
        loadingBookingTicket: true,
        errorBookTicketMessage: null,
      };
    }
    case BOOK_TICKET_SUCCESS: {
      return {
        ...state,
        successBookingTicketMessage: action.payload.data,
        loadingBookingTicket: false,
        activeStep: 2,
      };
    }
    case BOOK_TICKET_FAIL: {
      return {
        ...state,
        errorBookTicketMessage: action.payload.error,
        loadingBookingTicket: false,
        activeStep: 2,
      };
    }
    case TIMEOUT: {
      return {
        ...state,
        timeOut: true,
      };
    }
    case SET_ISMOBILE: {
      return {
        ...state,
        isMobile: action.payload.isMobile,
      };
    }
    case CREATE_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingCreateShowtime: true,
        errorCreateShowtime: null,
      };
    }
    case CREATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        successCreateShowtime: action.payload.data,
        loadingCreateShowtime: false,
      };
    }
    case CREATE_SHOWTIME_FAIL: {
      return {
        ...state,
        errorCreateShowtime: action.payload.error,
        loadingCreateShowtime: false,
      };
    }
    case RESET_CREATE_SHOWTIME: {
      state.loadingCreateShowtime = false;
      state.successCreateShowtime = null;
      state.errorCreateShowtime = null;
      return state;
    }
    default:
      return state;
  }
};
export default BookingTicketManagementReducer;
