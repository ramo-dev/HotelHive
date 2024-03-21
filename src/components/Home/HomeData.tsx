import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Flex,
  Rate,
  Space,
  Button,
  Skeleton,
  Layout,
} from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Navbar from "../navbar/Navigation";
import Hero from "../Hero/HeroData";
import getQuery from "../getQuery";
import { RandomLocation } from "./Locations";
import SiderContent from "../Sider/SiderContent";
// import { destCards } from "./desCards";
import "./homeStyles.css";

const { Content, Sider } = Layout;

const HomeData = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [favs, setFavs] = useState([]);

  async function getLocations() {
    setSearchLoading(true);
    const resp = await getQuery(query);
    const data = await resp;
    setLocation(data);
    setSearchLoading(false);
  }
  async function getHotelsOnLoad() {
    const getRandomLocation = RandomLocation();
    const arrayOfFetchedLocations = await getQuery(getRandomLocation);
    setLocation(arrayOfFetchedLocations);

    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getHotelsOnLoad();
    }, 2000); // Adjust timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query === "") {
      getHotelsOnLoad();
    } else {
      getLocations();
    }
  }

  // function addToFavs(hotelName: any) {
  //   setFavs(hotelName);
  //   console.log(favs);
  // }

  return (
    <>
      <Navbar />
      <Hero />
      <Layout
        style={{ marginTop: "15rem", width: "100%", borderRadius: "30px" }}
        className="mainSection"
      >
        <Sider
          className="sider"
          theme="light"
          trigger={null}
          collapsible
          collapsed={false}
          style={{ borderTopLeftRadius: "30px" }}
          width={210}
        >
          <SiderContent />
        </Sider>
        <Content>
          <Flex
            align="center"
            justify="space-between"
            gap="small"
            className="top"
            wrap="wrap"
            style={{ padding: "0 1.5rem" }}
          >
            <Typography.Title level={2}>
              {location.length > 0 ? (
                <>
                 {query ?  <>{location.length} hotels Found in {query}</> : <>{location.length} hotels Found in {RandomLocation()}</>}
                </>
              ) : (
                <>Welcome to HotelHive</>
              )}
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
            {loading || searchLoading ? (
              // Display Skeleton while loading
              <>
                <Skeleton active style={{ maxWidth: "98%" }} />
                <Skeleton active style={{ maxWidth: "98%" }} />
                <Skeleton active style={{ maxWidth: "98%" }} />
              </>
            ) : location && location.length > 0 ? (
              <>
                {location.map((hotel, index) => (
                  <Card
                    key={index}
                    hoverable
                    style={{ width: "620px", padding: "2rem" }}
                    className="hotelCard"
                  >
                    <Flex wrap="wrap" gap="middle">
                      <Skeleton loading={!hotel.thumbnails} active>
                        <img
                          src={hotel.thumbnails[0]}
                          alt={
                            hotel.thumbnails
                              ? hotel.title
                              : `photo for ${hotel.title} not found`
                          }
                          style={{ width: "300px" }}
                        />
                      </Skeleton>
                      <Flex
                        vertical
                        style={{ maxWidth: "240px" }}
                        gap="small"
                        align="start"
                      >
                        <Card.Meta
                          title={
                            <Typography.Title
                              level={4}
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "wrap",
                              }}
                            >
                              {hotel.title}
                            </Typography.Title>
                          }
                          description={
                            <>
                              <Typography.Title
                                level={5}
                                style={{ marginTop: "-1rem" }}
                              >
                                <span style={{ fontWeight: "500" }}>
                                  {" "}
                                  Location :
                                </span>{" "}
                                {hotel.location}
                              </Typography.Title>
                              <Typography.Text strong>
                                {hotel.price}
                              </Typography.Text>
                              <Flex>
                                <Rate
                                  allowHalf
                                  disabled
                                  defaultValue={
                                    hotel.rating > 0 ? hotel.rating : 0
                                  }
                                />
                                <Typography.Text>
                                  ({hotel.rating})
                                </Typography.Text>
                              </Flex>
                              <Typography.Text>
                                Reviews: (
                                {hotel.reviews > 0 ? hotel.reviews : 0})
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
                                  onClick={() => setFavs(hotel.title)}
                                >
                                  Add To Favourites
                                </Button>
                              </Flex>
                            </>
                          }
                        />
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </>
            ) : (
              <Typography.Title level={2}>No Hotels Found</Typography.Title>
            )}
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default HomeData;
