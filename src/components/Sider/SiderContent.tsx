import React, { useState } from "react";
import { Flex, Typography, Select, InputNumber, Rate } from "antd";

const { Option } = Select;

const SiderContent = ({ onSortChange, onMaxPriceChange, onRatingChange }) => {
  const [sortBy, setSortBy] = useState("Popularity");

  // Function to handle sorting change
  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value); // Pass sorting value to parent component
  };

  return (
    <Flex vertical align="center" className="Ratings">
      <Typography.Title level={4}>Sort by:</Typography.Title>
      <Flex vertical gap="2rem" align="center">
        <Select
          value={sortBy}
          style={{ width: 190, marginTop: "1rem" }}
          allowClear
          onChange={handleSortChange}
        >
          <Option value="Popularity">Popularity</Option>
          <Option value="A-Z">A-Z</Option>
          <Option value="Price">Price</Option>
          <Option value="Rating">Rating</Option>
        </Select>

        <Flex vertical align="center">
          <Typography.Text>Max Price</Typography.Text>
          <InputNumber
            addonBefore="+"
            addonAfter="ksh"
            defaultValue={0}
            style={{ maxWidth: "11rem" }}
            onChange={onMaxPriceChange}
          />
        </Flex>

        <Flex vertical align="center">
          <Typography.Text>Minimum Rating</Typography.Text>
          <Rate
            allowHalf
            defaultValue={0}
            style={{
              border: "1px solid lightgray",
              padding: ".6rem .5rem",
              borderRadius: "8px",
              width: "10rem",
            }}
            onChange={onRatingChange}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SiderContent;
