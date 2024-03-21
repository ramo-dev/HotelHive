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
            style={{ width: 190, marginTop: "1rem" }}
            allowClear
            options={[
              { value: "Price", label: "Popularity" },
              { value: "A-Z", label: "A-Z" },
            ]}
          />

          <Flex vertical align="center">
            <Typography.Text>Max Price</Typography.Text>
            <InputNumber
              addonBefore="+"
              addonAfter="ksh"
              defaultValue={0}
              style={{ maxWidth: "11rem" }}
            />
          </Flex>

          <Flex vertical align="center">
            <Typography.Text>Reviews</Typography.Text>
            <Rate
              allowHalf
              defaultValue={0}
              style={{
                border: "1px solid lightgray",
                padding: ".6rem .5rem",
                borderRadius: "8px",
                width: "10rem",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SiderContent;
