import { Button, Form, Offcanvas, Row } from "react-bootstrap";
import SpinnerLoading from "../components/SpinnerLoading";
import { useState } from "react";

export const OffCanvasSearchPage = ({ formik, category, location }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        <Button
          variant="primary"
          className="d-lg-none"
          onClick={handleShow}
          style={{ position: "fixed", top: "50px", maxWidth: "200px" }}
        >
          Detailed Search Menu
        </Button>
      </Row>

      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        className="bg-secondary p-2"
        style={{ borderRadius: "15px" }}
      >
        <Offcanvas.Body
          className="d-flex flex-column justify-content-between"
          style={{ gap: "10px", minWidth: "132px" }}
        >
          <Row>
            <h5 className="my-0">Detailed Search</h5>
          </Row>
          <Row>
            <Form className="d-flex">
              <Form.Control
                id="searchform"
                name="searchform"
                type="search"
                placeholder="Search"
                className="me-2 py-0 my-0"
                aria-label="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementById("detailed-search-button").click();
                  }
                }}
                onChange={(e) =>
                  formik.setFieldValue(
                    e.target.name,
                    document.getElementById("searchform").value
                  )
                }
              />
              <Button
                xl={1}
                id="detailed-search-button"
                variant="primary"
                onClick={formik.handleSubmit}
                className="py-0 my-0"
              >
                Find
              </Button>
            </Form>
          </Row>
          <Row>
            <label>
              <input
                type="checkbox"
                name="completed_event"
                value="completed_event"
                onChange={formik.handleChange}
              />
              Include previous events?
            </label>
          </Row>
          <Row>
            <h6 className="my-0">Date start</h6>
            <Form.Group controlId="startdate">
              <Form.Control
                type="date"
                name="startdate"
                placeholder="Start date"
                onChange={formik.handleChange}
                className="py-0"
              />
            </Form.Group>
          </Row>
          <Row>
            <h6 className="my-0">Date end</h6>
            <Form.Group controlId="enddate">
              <Form.Control
                type="date"
                name="enddate"
                placeholder="End date"
                onChange={formik.handleChange}
                className="py-0"
              />
            </Form.Group>
          </Row>
          <Row>
            <h6 className="my-0">Location</h6>
            <div
              className="d-flex flex-column flex-nowrap"
              style={{
                maxHeight: "18vh",
                maxWidth: "98%",
                overflowY: "scroll !important",
                overflowX: "hidden",
              }}
            >
              {location?.length ? (
                location.map((any_location, index) => (
                  <label key={index} style={{ textTransform: "capitalize" }}>
                    <input
                      type="checkbox"
                      name="location"
                      value={any_location}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    {any_location.toLowerCase()}
                  </label>
                ))
              ) : (
                <SpinnerLoading />
              )}
            </div>
          </Row>
          <Row>
            <h6 className="my-0">Categories</h6>
            <div
              className="d-flex flex-column flex-nowrap"
              style={{
                maxHeight: "18vh",
                maxWidth: "98%",
                overflowY: "scroll !important",
                overflowX: "hidden",
              }}
            >
              {category?.length ? (
                category.map((any_category, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="category"
                      value={any_category}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    {any_category}
                  </label>
                ))
              ) : (
                <SpinnerLoading />
              )}
            </div>
          </Row>
          <Row>
            <h6>Sort by:</h6>
            {["Highest Rating", "Most Popular", "Earlier by Date"].map(
              (any_sort, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="sorting"
                    value={any_sort.split(" ").join("")}
                    onChange={formik.handleChange}
                    className="mr-2"
                  />
                  {any_sort}
                </label>
              )
            )}
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
