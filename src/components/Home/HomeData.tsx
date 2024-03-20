import Hero from "../Hero/HeroData";
import Navbar from "../navbar/Navigation";
import { destCards } from "./desCards";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./homeStyles.css";
import RandomLocation from "./Locations";
// import { DownOutlined } from "@ant-design/icons";
import { Card, Layout, Typography, Flex, Rate, Space, Button } from "antd";
// import type { MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import SiderContent from "../Sider/SiderContent";
import Search from "antd/es/transfer/search";
const { Sider } = Layout;
const hotels = await destCards;
// https://hotelhive-backend.onrender.com/api/search/embu

const HomeData = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Layout
        style={{ marginTop: "15rem", width: "100%", borderRadius: "30px" }}
        className="mainSection"
      >
        {" "}
        <Sider
          className="sider"
          theme="light"
          trigger={null}
          collapsible
          collapsed={false}
          style={{ borderTopLeftRadius: "30px" }}
          width={200}
        >
          {/*  */}
          <SiderContent />
        </Sider>
        <Content>
          <Flex
            align="center"
            justify="space-around"
            gap="large"
            className="top"
          >
            <Typography.Title level={2} type="secondary">
              25 hotels Found
            </Typography.Title>
            <Flex align="center" gap="3rem">
              <Search placeholder="input search text" enterButton />

              <Flex align="center" gap="10px"></Flex>
            </Flex>
          </Flex>
          <Flex wrap="wrap" gap="large" style={{ padding: "2rem 0 0 2rem" }}>
            {hotels.map((hotel, index) => (
              <Card key={index} hoverable style={{ width: "600px" }}>
                <Flex wrap="wrap" gap="middle">
                  <img
                    src={hotel.thumbnails[1]}
                    alt={hotel.title}
                    style={{ width: "280px" }}
                  />
                  <Flex
                    vertical
                    style={{ paddingLeft: "1rem" }}
                    gap="middle"
                    align="start"
                    style={{ maxWidth: "300px" }}
                  >
                    <Typography.Title level={4}>{hotel.title}</Typography.Title>
                    <Typography.Text strong>{hotel.price}</Typography.Text>
                    <Flex>
                      <Rate allowHalf disabled defaultValue={hotel.rating} />
                      <Typography.Text>({hotel.rating})</Typography.Text>
                    </Flex>
                    <Typography.Text>
                      Reviews: ({hotel.reviews})
                    </Typography.Text>
                    <Space />
                    <Flex gap="large">
                      <Button>
                        <Link to={hotel.link}>View Hotel</Link>
                      </Button>
                      <Button className="button">
                        <Link to={hotel.link}>Hotel Details</Link>
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default HomeData;
