import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../json-server/api";

export default function EditEvent() {
  const { eventid } = useParams();
  const [thisEvent, setThisEvent] = useState([]);

  async function fetchData() {
    const res = await api.get(`/events/${eventid}`);
    const temp = res.data;
    setThisEvent(temp);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [temp]);

  return (
    <Container>
      <Card className="text-center">
        <Card.Header>Edit Your Event</Card.Header>
        <Card.Body>
          <Card.Title>Edit your data below</Card.Title>
          <Card.Img src={thisEvent.photo[0]} />
          <Card.Text>
            <Form className="mt-4 d-flex flex-column align-items-center">
              <Form.Label htmlFor="points">Tambah Saldo</Form.Label>
              <Form.Control
                type="number"
                id="pointsform"
                name="pointsform"
                aria-describedby=""
                min="0"
                style={{ width: "200px" }}
              />
            </Form>
          </Card.Text>
          <Button variant="primary">Top Up</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </Container>
  );
}
