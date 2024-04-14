import React, { CSSProperties, useEffect } from "react";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Radio,
  Space,
} from "antd";
import dayjs from "dayjs";

interface DriverLicenseFormType {
  disabled: boolean;
  isCreating: boolean;
  licenseLevel?: Array<any>;
  onFinish?: any;
  defaultValue?: any;
  usersList?:Array<any>
}

export const DriverLicenseForm = ({
  disabled,
  isCreating,
  licenseLevel,
  usersList,
  onFinish,
  defaultValue,
}: DriverLicenseFormType) => {
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
            <div className="font-bold">Driver License</div>
            <div className="mb-4 font-bold">Registration</div>
          </>
        )}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Users"
              name="organaization_user"
              rules={[
                { required: true, message: "License Level is required!" },
              ]}
            >
              <Select
                placeholder="Users"
                options={usersList?.map((e) => {
                  return { label: e.name, value: e.id };
                })}
              />
            </Form.Item>
            <Form.Item
              label="License Level"
              name="license_level"
              rules={[
                { required: true, message: "License Level is required!" },
              ]}
            >
              <Select
                placeholder="License Level"
                options={licenseLevel?.map((e) => {
                  return { label: e.name, value: e.id };
                })}
              />
            </Form.Item>

            <Form.Item
              label="Issue Date"
              name="issue_date"
              rules={[{ required: true, message: "Issue Date is required!" }]}
            >
              <DatePicker
                className="w-full"
                placeholder="Issue Date"
                maxDate={dayjs()}
              />
            </Form.Item>

            <Form.Item
              label="Expiration Date"
              name="expiration_date"
              rules={[
                { required: true, message: "Expiration Date is required!" },
              ]}
            >
              <DatePicker
                className="w-full"
                placeholder="Expiration Date"
                minDate={dayjs().add(15, "day")}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="License Years"
              name="license_years"
              rules={[
                { required: true, message: "License Years is required!" },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={2}>2 Years</Radio>
                  <Radio value={4}>4 Years</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
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
              <Button block danger type="primary">
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Item>
      )}
    </Form>
  );
};
