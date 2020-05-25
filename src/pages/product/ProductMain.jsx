import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Row, Col, Tooltip, Icon, Popconfirm, Spin } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';

import InputForm from './InputForm';

const ProductMain = (props) => {
    const [drawerVisible, showDrawer] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        setLoading(true);
        props.dispatch({
            type: 'product/fetchProducts',
        })
        .then((data) => {
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        setProductsList(addActions(props.products));
    }, [props.products]);


    const onClose = () => {
      showDrawer(false);
    };

    const newProduct = () => {
        setCurrentProduct({});
        showDrawer(true);
    }

    const editProduct = (id) => {
        const currentProduct = props.products.filter(prod => prod.id === Number(id))[0];
        setCurrentProduct(currentProduct);
        showDrawer(true);
    }

    const onSubmit = () => {
        setLoading(true);
        if (currentProduct && currentProduct.id)  {
            // update
            props.dispatch({
                type: 'product/updateProduct',
                payload: currentProduct,
            })
            .then(() => {
                showDrawer(false);
                setLoading(false);
            })
        } 
        else {
            // create
            props.dispatch({
                type: 'product/addProduct',
                payload: currentProduct,
            })
            .then(() => {
                showDrawer(false);
                setLoading(false);
            })
        }
    }

    const removeProduct = (id) => {
        props.dispatch({
            type: 'product/removeProduct',
            payload: id,
        });
    }

    const addActions = (products) => {
        return products.map(prd => {
            return {
                ...prd,
                action: (
                    <div className="icons-list">
                      <Tooltip title="Edit">
                        <Icon type="edit" onClick={() => { editProduct(prd.id) }} />
                      </Tooltip>{' '}
                      &nbsp;
                      <Popconfirm
                        title="Are you sure delete this product?"
                        onConfirm={() => { removeProduct(prd.id) }}
                        okText="Confirm"
                        cancelText="No"
                      >
                        <Icon theme="filled" type="delete" />
                      </Popconfirm>
                    </div>
                ),
            };
        });
    }

    const filterProducts = (keyword) => {
        if (!keyword && keyword === '') {
            setProductsList(addActions(props.products));
            return;
        }

        const productsFiltered = props.products.filter(p => {
            const regex = new RegExp(`${keyword}`, 'gi');
            return (
                p.name && p.name.match(regex) ||
                p.unitPrice &&  p.unitPrice.toString().match(regex) ||
                p.type && p.type.match(regex) ||
                p.description && p.description.match(regex)
            );
        });
        setProductsList(addActions(productsFiltered));
    }

    const columns = 
        [
          {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
          },
          {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            width: '13%',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            width: '15%',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            width: '32%',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            width: '20%',
          },
        ];

    if (loading) {
        return (
            <div style={{ paddingTop: 100, textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }
            
    return (
        <div>
            {/* Top Bar */}
            <Row>
                <Col span={8}>
                    <Button type="primary" onClick={newProduct}>
                        <PlusOutlined /> New Product
                    </Button>
                </Col>
                <Col span={8} offset={8}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => { filterProducts(value) }}
                        style={{ width: 200 }}
                        enterButton
                    />
                </Col>
            </Row>
            <br/>

            {/* Drawer */}
            <Drawer
                title={(currentProduct.id) ? `Edit product (id: ${currentProduct.id})` : "A new product"}
                width={400}
                onClose={onClose}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <InputForm 
                    onClose={onClose}
                    onSubmit={onSubmit}
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                    defaultProduct={props.currentProduct}/>
            </Drawer>

            {/* List */}
            <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '3px' }}>
                <Table
                    style={{ width: 'auto' }}
                    indentSize={1}
                    columns={columns}
                    dataSource={productsList}
                />
            </div>
        </div>
    );
}

export default connect(({ product }) => ({
    ...product,
}))(ProductMain);
  