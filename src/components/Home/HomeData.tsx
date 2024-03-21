import Hero from "../Hero/HeroData";
import Navbar from "../navbar/Navigation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getQuery from "../getQuery";
import "./homeStyles.css";
import {RandomLocation} from "./Locations";
import { Card, Layout, Typography, Flex, Rate, Space, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import SiderContent from "../Sider/SiderContent";
import { SearchOutlined } from "@ant-design/icons";
const { Sider } = Layout;



const HomeData = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState([]);

  async function getLocations(){
    const resp = await getQuery(query)
    const data = await resp
    console.log(data)
    setLocation(data)
      
  }

  function handleSubmit(e:any){
    e.preventDefault();
    getLocations();
  }

useEffect(() => {
  async function getHotelsOnLoad(){
    const getRandomLocation = RandomLocation();
    const arrayOfFetchedLocations = await getQuery(getRandomLocation);
    setLocation(arrayOfFetchedLocations);
  }
  getHotelsOnLoad()
},[])


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
            <Typography.Title level={2}>
              {location && <>{location.length} hotels Found</>}
            </Typography.Title>
            <Flex align="center" gap="large">
              <form className="destinationSearchMain" onSubmit={handleSubmit}>
                <input
                  type="search"
                  placeholder="Enter location or hotel..."
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button>
                  <SearchOutlined style={{ fontSize: "1.2rem" }} />
                </button>
              </form>
            </Flex>
          </Flex>
          <Flex wrap="wrap" gap="middle" style={{ padding: "1rem 0 0 1rem" }}>
            {location ? (
              <>
                {location.map((hotel, index) => (
                  <Card
                    key={index}
                    hoverable
                    style={{ width: "620px", padding: "2rem" }}
                    className="hotelCard"
                  >
                    <Flex wrap="wrap" gap="middle">
                      <img
                        src={hotel.thumbnails[0]}
                        alt={hotel.title}
                        style={{ width: "300px" }}
                      />
                      <Flex
                        vertical
                        style={{ maxWidth: "240px" }}
                        gap="small"
                        align="start"
                      >
                        <Typography.Title level={4}>
                          {hotel.title}
                        </Typography.Title>
                        <Typography.Title level={5}>
                          {hotel.location}
                        </Typography.Title>
                        <Typography.Text strong>{hotel.price}</Typography.Text>
                        <Flex>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={hotel.rating}
                          />
                          <Typography.Text>({hotel.rating})</Typography.Text>
                        </Flex>
                        <Typography.Text>
                          Reviews: ({hotel.reviews})
                        </Typography.Text>
                        <Space />
                        <Flex gap="small">
                          <Button>
                            <Link to={hotel.link}>Hotel Details</Link>
                          </Button>
                          <Button
                            style={{
                              background: "var(--primary)",
                              color: "var(--textWhite)",
                            }}
                          >
                            <Link to={hotel.link}>Add To Favourites</Link>
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <Typography.Title level={2}>No Hotels Found</Typography.Title>
              </>
            )}
            )
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default HomeData;
