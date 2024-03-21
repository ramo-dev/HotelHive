import { useState, useEffect } from "react";
import { Card, Typography, Flex, Rate, Space, Button, Skeleton, Layout } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Navbar from "../navbar/Navigation";
import Hero from "../Hero/HeroData";
import getQuery from "../getQuery";
import { RandomLocation } from "./Locations";
import SiderContent from "../Sider/SiderContent";
import "./homeStyles.css";

const { Content, Sider } = Layout;

const HomeData = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Popularity"); // State to hold sorting value
  const [maxPrice, setMaxPrice] = useState(0); // State to hold maximum price
  const [minRating, setMinRating] = useState(0); // State to hold minimum rating

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

  function handleSubmit(e) {
    e.preventDefault();
    if (query === "") {
      getHotelsOnLoad();
    } else {
      getLocations();
    }
  }

  // Function to handle sorting change
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Function to handle maximum price change
  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  // Function to handle minimum rating change
  const handleRatingChange = (value) => {
    setMinRating(value);
  };

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
          <SiderContent
            onSortChange={handleSortChange}
            onMaxPriceChange={handleMaxPriceChange}
            onRatingChange={handleRatingChange}
          />
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
                  {query ? (
                    <>
                      {location.length} hotels Found in {query}
                    </>
                  ) : (
                    <>
                      {location.length} hotels Found in {RandomLocation()}
                    </>
                  )}
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
                {location
                  .filter((hotel) => hotel.price <= maxPrice) // Filter by maximum price
                  .filter((hotel) => hotel.rating >= minRating) // Filter by minimum rating
                  .sort((a, b) => {
                    if (sortBy === "A-Z") {
                      return a.title.localeCompare(b.title); // Sort alphabetically
                    }
                    else if (sortBy === "Price") {
                      return a.price - b.price; // Sort by price
                    } else if (sortBy === "Rating") {
                      return b.rating - a.rating; // Sort by rating
                    } else {
                      // Default to sort by Popularity
                      return b.reviews - a.reviews; // Sort by popularity (number of reviews)
                    }
                  })
                  .map((hotel, index) => (
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
