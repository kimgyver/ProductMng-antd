import { queryProducts, insertProduct, updateProduct, deleteProduct } from "@/services/product";

const ProductModel = {
  namespace: 'product',
  state: {
    products: [],
    currentProduct: {},
  },
  effects: {
    *fetchProducts(_, { call, put }) {
      const response = yield call(queryProducts);
      yield put({
        type: 'getProducts',
        payload: response,
      });
    },

    *addProduct({ payload }, { call, put, select }) {
      // id generation: max + 1
      const { products } = yield select(state => state.product);
      const newId = products.map(p => p.id).reduce((total, curr) => Math.max(total, curr)) + 1;

       const responseObj = yield call(insertProduct, payload);
       if (responseObj.status !== 'ok') return;
       console.log(responseObj)
      
      const response = {...payload, id: newId};
      yield put({
        type: 'add',
        payload: response,
      });
    },

    *updateProduct({ payload }, { call, put }) {
      const response = yield call(updateProduct, payload);
      if (response.status !== 'ok') return;
      
      yield put({
        type: 'update',
        payload,
      });
    },

    *removeProduct({ payload }, { call, put }) {
      const response = yield call(deleteProduct, payload);
      if (response.status !== 'ok') return;
      
      yield put({
        type: 'remove',
        payload: payload,
      });
    },
  },

  reducers: {
    getProducts(state, action) {
      return { ...state, products: action.payload };
    },

    add(state, action) {
      return { ...state, products: [...state.products, action.payload] };
    },
    update(state, action) {
      return { ...state,
        products: state.products.map(prd =>
          prd.id === action.payload.id ? action.payload : prd
        ) 
      };
    },
    remove(state, action) {
      return { ...state,
        products: state.products.filter(prd =>
          prd.id !== action.payload
        ) 
      };
    },

  },
};
export default ProductModel;
