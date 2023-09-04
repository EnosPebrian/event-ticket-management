import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import api from "../json-server/api";
import { useParams, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import HeaderNavbar from "../components/Header-navbar";
import { OffCanvasSearchPage } from "../components/OffCanvasSearchPage";
import { EventCardOnSearchPage } from "../components/EventCardOnSearchPage";

export const SearchPage = () => {
  const { searchkey } = useParams();
  const [search, setSearch] = useSearchParams();
  const [filtered, setFiltered] = useState([]);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [value, setValue] = useState({
    searchform: search.get("name"),
    startdate: "",
    completed_event: false,
    enddate: "",
    location: [],
    category: [],
    sorting: [],
  });
  const [page, setPage] = useState(1);
  const [queryString, SetQueryString] = useState("");

  const formik = useFormik({
    initialValues: {
      searchform: search.get("name"),
      startdate: "",
      completed_event: false,
      enddate: "",
      location: [],
      category: [],
      sorting: [],
    },
    onSubmit: (values) => {
      setValue(values);
    },
  });

  const updatefilter = async () => {
    let queryString = "events/q?";
    if (value?.searchform) {
      queryString += `name=${value?.searchform}&`;
    }
    if (value?.startdate) {
      queryString += `date_start=${value?.startdate}&`;
    } else if (!value?.startdate && value?.completed_event) {
      queryString += `completed_event=1&`;
    }
    if (value?.enddate) {
      queryString += `date_end=${value?.enddate}&`;
    }
    if (value?.location?.length) {
      value?.location.forEach((val) => (queryString += `location=${val}&`));
    }
    if (value?.category?.length) {
      value?.category.forEach((val) => (queryString += `category=${val}&`));
    }
    if (value?.sorting?.length) {
      value?.sorting.forEach((val) => (queryString += `order_by=${val}&`));
    }
    await api.get(queryString).then((result) => {
      SetQueryString(queryString);
      setFiltered(result.data.data);
      setPage(result.data.number_of_pages);
      window.history.pushState(null, "", queryString.slice(7));
    });
  };

  async function fetchEvents() {
    if (searchkey) {
      await api
        .get(`events/${searchkey}?name=${search.get("name")}`)
        .then((result) => {
          console.log(`searchkey`, result.data);
          setFiltered(result.data.data);
          setPage(result.data.number_of_pages);
        })
        .catch((err) => console.log(`searchkey`, err));
    } else {
      await api
        .get(`events/q?`)
        .then((result) => {
          setFiltered(result.data.data);
          setPage(result.data.number_of_pages);
        })
        .catch((err) => console.log(`no search key`, err));
    }
  }
  async function getLocationAndCategory() {
    let queryStringLocation = "/locations/allEvent";
    let queryStringEventCategory = "/event_categories/allEvent";
    if (value?.completed_event) {
      queryStringLocation += "?completed_event=1";
      queryStringEventCategory += "?completed_event=1";
    }
    const resLoc = await api.get(queryStringLocation);
    const resEventCat = await api.get(queryStringEventCategory);
    setLocation(resLoc.data);
    setCategory(resEventCat.data);
  }

  const handlePagination = async (e) => {
    let pageQueryString = queryString + `page=${e.target.id.slice(11)}`;
    await api.get(pageQueryString).then((result) => {
      setFiltered(result.data.data);
      setPage(result.data.number_of_pages);
      window.history.pushState(null, "", pageQueryString.slice(7));
    });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchEvents();
    getLocationAndCategory();
  }, []);

  useEffect(() => {
    getLocationAndCategory();
  }, [value?.completed_event]);

  useEffect(() => {
    const executeFilter = setTimeout(() => {
      formik.handleSubmit();
    }, 500);
    return () => clearTimeout(executeFilter);
  }, [formik.values]);

  useEffect(() => {
    updatefilter();
  }, [value]);

  return (
    <>
      <HeaderNavbar />
      <Row>
        <Col
          xl={2}
          lg={3}
          md={4}
          className="vh-100 mt-2"
          id="side-bar"
          style={{ position: "sticky", top: "70px" }}
        >
          <OffCanvasSearchPage
            formik={formik}
            location={location}
            category={category}
          />
        </Col>
        <Col>
          <Container>
            <Row>
              {filtered[0] ? (
                filtered.map((this_event, index) => (
                  <EventCardOnSearchPage
                    this_event={this_event}
                    index={index}
                  />
                ))
              ) : (
                <span className="d-flex flex-column align-items-center justify-content-center w-100">
                  <h2 className="my-5">No match</h2>
                  <Button className="my-3">
                    <a href="/search/q?">Browse All Event</a>
                  </Button>
                  <h4>or</h4>
                  <h4>Try the detailed search tool on the left</h4>
                </span>
              )}
            </Row>
            {page > 1 ? (
              <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                {filtered[0] && <span className="mr-3">Page:</span>}
                {[...new Array(page)].map((val, index) => (
                  <span key={index} className="d-flex mr-1">
                    <Button
                      variant="light color-secondary"
                      page={index + 1}
                      onClick={(e) => handlePagination(e)}
                      id={`buttonPage-${index + 1}`}
                    >
                      {index + 1}
                    </Button>
                  </span>
                ))}
              </div>
            ) : null}
          </Container>
        </Col>
      </Row>
    </>
  );
};
