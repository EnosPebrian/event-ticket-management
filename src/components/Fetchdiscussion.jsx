import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { SVGPlus } from "./svgPlus";
import { useNavigate } from "react-router-dom";

function FetchDiscussion({ eventid, users_map, events_map }) {
  const [discussionscontainer, setDiscussionscontainer] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);
  let userid;
  try {
    userid = JSON.parse(localStorage.getItem("auth")).id;
  } catch (err) {
    console.log(err);
  }
  const navigate = useNavigate();

  const load_discussion = async () => {
    let res_dis = await api.get(`discussions`);
    let thiseventdiscus = [...res_dis.data];
    let temp_fil = thiseventdiscus.filter((rev) => rev.eventid == eventid)[0];
    if (!temp_fil) {
      try {
        await api
          .post(`discussions`, {
            id: eventid,
            eventid: eventid,
            question: [],
            question_id: [],
            reply: {},
            reply_id: {},
          })
          .then(async () => {
            res_dis = await api.get(`discussions`);
            thiseventdiscus = [...res_dis.data];
            temp_fil = thiseventdiscus.filter(
              (rev) => rev.eventid == eventid
            )[0];
            setDiscussionscontainer({
              id: eventid,
              eventid: eventid,
              question: [],
              question_id: [],
              reply: {},
              reply_id: {},
            });
          });
      } catch (err) {
        console.log(err);
      }
    } else setDiscussionscontainer(temp_fil);
  };

  async function postadiscussion() {
    if (!userid) return navigate(`/login`);
    if (document.getElementById("formaddnewquestion").value) {
      const new_discussion = {
        id: eventid,
        eventid: eventid,
        question: [
          ...discussionscontainer.question,
          document.getElementById("formaddnewquestion").value,
        ],
        question_id: [...discussionscontainer.question_id, userid],
        reply: {
          ...discussionscontainer.reply,
          [discussionscontainer.question.length]: [],
        },
        reply_id: {
          ...discussionscontainer.reply_id,
          [discussionscontainer.question.length]: [],
        },
      };
      await api
        .patch(`discussions/${eventid}`, new_discussion)
        .then(() => load_discussion());
    }
  }

  function addInput(e) {
    async function postreply(ev) {
      const comment = document.getElementById(
        `form-${ev.target.id.slice(7)}`
      ).value;
      const temp = {
        id: eventid,
        eventid: eventid,
        question: [...discussionscontainer?.question],
        question_id: [...discussionscontainer?.question_id],
        reply: {
          ...discussionscontainer?.reply,
          [ev.target.id.slice(7)]: [
            ...discussionscontainer?.reply[ev.target.id.slice(7)],
            comment,
          ],
        },
        reply_id: {
          ...discussionscontainer?.reply_id,
          [ev.target.id.slice(7)]: [
            ...discussionscontainer?.reply_id[ev.target.id.slice(7)],
            userid,
          ],
        },
      };
      await api
        .patch(`discussions/${eventid}`, temp)
        .then(() => load_discussion());
      document.getElementById(`form-${ev.target.id.slice(7)}`).value = "";
    }

    const disc_container = document.getElementById(
      `disc-card-${e.target.id.slice(9)}`
    );

    let div = document.createElement("div");
    div.style.cssText = "display:flex; justify-content:center; width:100%";
    let input = document.createElement("input");
    input.style.cssText = "width:85%;border:2px solid black";
    input.id = `form-${e.target.id.slice(9)}`;
    input.placeholder = "Reply discussion above";
    input.onkeydown = (ev) => {
      if (ev.key == "Enter") {
        document.getElementById(`button-${ev.target.id.slice(5)}`).click();
      }
    };
    let button = document.createElement("button");
    button.style.cssText =
      "float:right; text-align:center; background-color:gray; opacity:1 !important; margin-left:5px; padding:0 3px; border-radius:10px";
    button.id = `button-${e.target.id.slice(9)}`;
    button.innerHTML = "submit";
    button.onclick = (e) => {
      postreply(e);
    };
    let document_frag = document.createDocumentFragment();
    document_frag.appendChild(div);
    div.appendChild(input);
    div.appendChild(button);
    disc_container.appendChild(document_frag);
  }

  useEffect(() => {
    load_discussion();
  }, []);

  useEffect(() => {
    load_discussion();
  }, [activitycounter]);

  if (discussionscontainer) {
    return (
      <>
        <Card.Body style={{ overflowY: "scroll", maxHeight: "100vh" }}>
          {discussionscontainer.question?.length
            ? discussionscontainer.question?.map((disc, index) => (
                <Card key={index} id={`disc-card-${index}`}>
                  <div className="px-3">
                    <span className="d-flex flex-row" style={{ gap: "5px" }}>
                      <span className="pt-1">
                        <Card.Img
                          src="https://static.thenounproject.com/png/5034901-200.png"
                          style={{ maxWidth: "20px", maxHeight: "20px" }}
                        />
                      </span>
                      {discussionscontainer.question_id[index] ? (
                        users_map.get(discussionscontainer.question_id[index])
                          ?.username
                      ) : (
                        <Spinner />
                      )}
                    </span>
                  </div>
                  <Card.Body className="bg-light px-3">
                    {disc}
                    <Button
                      style={{ float: "right", padding: "0" }}
                      variant="secondary"
                      onClick={(e) => addInput(e)}
                    >
                      <SVGPlus identifier={index} />
                    </Button>

                    <div className="ml-3 px-3 pt-1">
                      {discussionscontainer.reply[index]
                        ? discussionscontainer.reply[index].map((val, idx) => (
                            <>
                              <Card className="mb-2">
                                <div
                                  className="d-flex flex-row px-3"
                                  style={{ gap: "5px" }}
                                >
                                  <span className="pt-1">
                                    <Card.Img
                                      src="https://static.thenounproject.com/png/5034901-200.png"
                                      style={{
                                        maxWidth: "20px",
                                        maxHeight: "20px",
                                      }}
                                    />
                                  </span>
                                  <span>
                                    {
                                      users_map.get(
                                        discussionscontainer.reply_id[index][
                                          idx
                                        ]
                                      )?.username
                                    }
                                  </span>
                                </div>
                                <Card.Body className="bg-light pl-3 py-0">
                                  {val}
                                </Card.Body>
                              </Card>
                            </>
                          ))
                        : null}
                    </div>
                  </Card.Body>
                </Card>
              ))
            : null}
        </Card.Body>
        <Card.Body>
          <Card className="p-3">
            <Form>
              <Form.Group className="mb-3" controlId="formaddnewquestion">
                <Form.Label>
                  <b>Write a new question</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write your question here"
                  onKeyDown={(e) => {
                    if (e.key == "Enter")
                      document.getElementById("postdiscussion").click();
                  }}
                />
                <Form.Text className="text-muted">
                  More spesific question helps alot
                </Form.Text>
                <Button
                  className="mt-2"
                  style={{ float: "right" }}
                  variant="secondary"
                  id="postdiscussion"
                  onClick={postadiscussion}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Card.Body>
      </>
    );
  } else return <span>This event has no discussion</span>;
}

export default FetchDiscussion;
