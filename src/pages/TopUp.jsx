import { width } from "@mui/system";
import { useFormik } from "formik";
import { async } from "q";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import api from "../json-server/api";
import { types } from "../redux/types";

export default function TopUp() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function addsaldo() {
    const val = document.getElementById("pointsform").value;
    if (val < 0) return alert(`saldo tidak boleh kurang dari 0`);
    try {
      await api.patch(`users/${userSelector.id}`, {
        ...userSelector,
        ["points"]: Number(userSelector.points) + Number(val),
      });
      await dispatch({
        type: types.update_saldo,
        payload: {
          ["points"]: Number(userSelector.points) + Number(val),
        },
      }).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  }
  //   const formik = useFormik({
  //     initialValues: { pointsform: 0 },
  //     validationSchema: Yup.object().shape({
  //       pointsform: Yup.number().min(1),
  //     }),
  //   });
  console.log(userSelector);
  return (
    <Container>
      <Card className="text-center">
        <Card.Header>Top Up Saldo</Card.Header>
        <Card.Body>
          <Card.Title>
            Saldo saat ini: Rp
            {Number(userSelector.points).toLocaleString(`id-ID`)},00
          </Card.Title>
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
          <Button variant="primary" onClick={addsaldo}>
            Top Up
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </Container>
  );
}
