import React from 'react';
import { Button, Form, Row, Col, Input, Select, message} from 'antd';
import Joi from 'joi-browser';


const InputForm = (props) => {
    const {onClose, onSubmit, currentProduct, setCurrentProduct, defaultProduct} = props;

    const schema = {
        name: Joi.string().required().label('Name'),
        unitPrice: Joi.number().required().label('Unit Price'),
        type: Joi.string().required().label('Type'),
        description: Joi.string().label('Description'),
        id: Joi.any().label('ID'),
    };

    const validate = () => {
        const result = Joi.validate(currentProduct, schema);
        if (result.error) {
            const errorMessage = result.error.details[0].message;
            message.error(`Error: ${errorMessage}`);
            return false;
        }
        return true;
    }

    const handleChange = (e, componentName) => {
        const name = typeof componentName  === 'string' ? componentName : e.target.name;
        const value = typeof e === 'string' ? e : e.target.value;
        setCurrentProduct({
            ...currentProduct,
            [name]: value
        }, console.log(currentProduct));
    }

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        required
                        name={['user', 'name']}
                        label="Name"
                        rules={[{ required: true, message: 'name' }]}
                    >
                        <Input placeholder="name" 
                            name="name"
                            onChange={e => {
                                handleChange(e, null);
                            }}
                            defaultValue={defaultProduct.name}
                            value={currentProduct.name}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        required
                        name="unitPrice"
                        label="Unit Price"
                        rules={[{ required: true}]}
                    >
                        <Input placeholder="unit price" 
                            name="unitPrice"
                            onChange={e => {
                                handleChange(e, null);
                            }}
                            defaultValue={defaultProduct.unitPrice}
                            value={currentProduct.unitPrice}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        required
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'type' }]}
                    >
                        <Select placeholder="type" name="type"
                            onChange={value => {
                                handleChange(value, 'type');
                            }}
                            value={currentProduct.type}
                        >
                            <Option value="software">Software</Option>
                            <Option value="hardware">Hardware</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ message: 'description' }]}
                    >
                        <Input.TextArea rows={4} placeholder="description" 
                            onChange={value => {
                                handleChange(value, 'description');
                            }}
                            value={currentProduct.description}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <div
                style={{
                position: 'fixed',
                right: 0,
                bottom: 0,
                zIndex: 100,
                width: 400,
                height: 55,
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                
                <Button type="primary" onClick={ () =>  validate() && onSubmit() }>
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default InputForm;