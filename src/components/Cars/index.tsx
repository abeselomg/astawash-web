import React, { CSSProperties, useEffect } from "react";
import { DatePicker, Form, Input, Select, Button, Row, Col } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import Router from "next/router";

interface CardFormType {
  disabled: boolean;
  isCreating: boolean;
  carRegion?: Array<any>;
  carBrand?: Array<any>;
  carCode?: Array<any>;
  onFinish?: any;
  defaultValue?: any;
}

export const CarForm = ({
  disabled,
  isCreating,
  carRegion = [],
  carBrand = [],
  carCode = [],
  onFinish,
  defaultValue,
}: CardFormType) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Form
      form={form}
      disabled={disabled}
      labelCol={{ span: 24 }}
      onFinish={(e) => {
        console.log(e);
        let org = localStorage.getItem("orgId");
        e.organaization = org;
        onFinish(e);
      }}
    >
      <div className="border-2 bg-white py-4 my-3 mx-4 p-4 border-black rounded-lg">
        {isCreating && (
          <>
            <div className="font-bold">Car</div>
            <div className="mb-4 font-bold">Registration</div>
          </>
        )}
        <Form.Item label="Plate Number" name="plate_number">
          <Input placeholder="Plate Number" />
        </Form.Item>
        <Form.Item label="Region" name="regionId">
          <Select
            placeholder="Region"
            options={carRegion.map((e) => {
              return { label: e?.region, value: e?.id };
            })}
          />
        </Form.Item>
        <Form.Item label="Code" name="codeId">
          <Select
            placeholder="Code"
            options={carCode.map((e) => {
              return { label: e?.code, value: e?.id };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Third Party Insurance Expiration Date"
          name="third_party_expiration_date"
        >
          <DatePicker
            className="w-full"
            placeholder="Third Party Insurance Expiration Date"
            minDate={dayjs().add(15, "day")}
          />
        </Form.Item>

        <Form.Item label="Bolo Expiration Date" name="bolo_expiration_date">
          <DatePicker
            className="w-full"
            placeholder="Bolo Expiration Date"
            minDate={dayjs().add(15, "day")}
          />
        </Form.Item>
        <Form.Item
          label="Full Insurance Expiration Date"
          name="full_insurance_expiration_date"
        >
          <DatePicker
            className="w-full"
            placeholder="Full Insurance Expiration Date"
            minDate={dayjs().add(15, "day")}
          />
        </Form.Item>
        <Form.Item label="CC" name="car_cc">
          <Input placeholder="CC" />
        </Form.Item>
        <Form.Item label="Car Brand" name="carBrandId">
          <Select
            placeholder="Car Brand"
            options={carBrand.map((e) => {
              return { label: e?.name, value: e?.id };
            })}
          />
        </Form.Item>
        <Form.Item label="Manufacturing Year" name="manufacturing_year">
          <Input placeholder="Manufacturing Year" />
        </Form.Item>
      </div>
      {isCreating && (
        <Form.Item>
          <Row justify="center" gutter={24}>
            <Col span={12}>
              {" "}
              <Button block type="primary" htmlType="submit">
                Add
              </Button>
            </Col>
            <Col span={12}>
              {" "}
              <Button block danger type="primary" onClick={() => Router.back()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      )}
    </Form>
  );
};
