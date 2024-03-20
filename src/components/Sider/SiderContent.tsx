import { Flex, Typography, Checkbox } from "antd";

const SiderContent = () => {
  return (
    <>
      <Flex vertical align="center">
        <Typography.Title level={4}>Category : </Typography.Title>
        <Typography.Text>Board Basis</Typography.Text>
        <Checkbox>Hotel</Checkbox>
      </Flex>
    </>
  );
};

export default SiderContent;
