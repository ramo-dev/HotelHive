import {
  Flex,
  Typography,
  Slider,
  Rate,
  Switch,
  Select,
  Space,
  InputNumber,
} from "antd";
const { Option } = Select;

const SiderContent = () => {
  return (
    <>
      <Flex vertical align="center" className="Ratings">
        <Typography.Title level={4}>Sort by:</Typography.Title>
        <Flex vertical gap="2rem" align="center">
          <Select
            defaultValue="Popularity"
            style={{ width: 130, marginTop: "1rem" }}
            allowClear
            options={[
              { value: "Price", label: "Popularity" },
              { value: "A-Z", label: "A-Z" },
            ]}
          />

          <Flex vertical align="center">
            <Typography.Text>Reviews</Typography.Text>
            <Rate
              allowHalf
              defaultValue={0}
              style={{
                border: "1px solid lightgray",
                padding: ".6rem .8rem",
                borderRadius: "8px",
              }}
            />
          </Flex>
          <Flex vertical align="center">
            <Typography.Text>Price Range</Typography.Text>
            <InputNumber
              addonBefore="+"
              addonAfter="ksh"
              defaultValue={100}
              style={{ maxWidth: "10rem" }}
            />
          </Flex>

          <Flex vertical align="center">
            <Typography.Text>Amenities</Typography.Text>
            <Switch defaultChecked />
          </Flex>
          <Flex vertical align="center">
            <Typography.Text>Special Offers</Typography.Text>
            <Switch defaultChecked />
          </Flex>
          <Flex vertical align="center">
            <Typography.Text>Brand</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SiderContent;
