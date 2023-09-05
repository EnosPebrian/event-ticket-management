import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { SVGPlus } from "./svgPlus";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FetchDiscussion({ eventid }) {
  const [discussionscontainer, setDiscussionscontainer] = useState([]);
  const [discussionPage, setDiscussionPage] = useState(0);
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  const token = localStorage.getItem("auth");

  const load_discussion = async (page = 1) => {
    try {
      let res_dis = await api.get(
        `/discussions/context/${eventid}?page=${page}`
      );
      console.log(res_dis.data.data);
      setDiscussionscontainer(res_dis.data.data);
      setDiscussionPage(res_dis.data.number_of_pages);
    } catch (err) {
      console.log(err);
    }
  };

  async function postadiscussion() {
    if (!token) return navigate(`/login`);
    if (document.getElementById("formaddnewquestion").value) {
      const new_discussion = {
        eventid: eventid,
        userid: userSelector?.id,
        question_text: document.getElementById("formaddnewquestion").value,
      };
      await api
        .post(`/discussions`, new_discussion)
        .then(() => load_discussion())
        .catch((err) => console.log(err));
      document.getElementById("formaddnewquestion").value = "";
    }
  }

  function addInput(e) {
    async function postreply(ev) {
      const temp = {
        eventid: eventid,
        userid: userSelector?.id,
        discussion_id: e.target.id.slice(9),
        reply_text: document.getElementById(`form-${e.target.id.slice(9)}`)
          .value,
      };
      await api
        .post(`/discussion_replies`, temp)
        .then(() => {
          load_discussion();
          document
            .getElementById(`form-reply-${e.target.id.slice(9)}`)
            .remove();
        })
        .catch((err) => console.log(err));
    }

    const disc_container = document.getElementById(
      `disc-card-${e.target.getAttribute("name")}`
    );
    let div = document.createElement("div");
    div.style.cssText = "display:flex; justify-content:center; width:100%";
    div.id = `form-reply-${e.target.id.slice(9)}`;
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
    try {
      document_frag.appendChild(div);
      div.appendChild(input);
      div.appendChild(button);
      disc_container.appendChild(document_frag);
    } catch (err) {
      console.log(err);
    }
  }

  const handlePagination = (page) => {
    load_discussion(page);
  };

  useEffect(() => {
    load_discussion();
  }, []);

  if (discussionscontainer) {
    return (
      <>
        <Card.Body style={{ overflowY: "scroll", maxHeight: "100vh" }}>
          {discussionscontainer?.length
            ? discussionscontainer.map((disc, index) => (
                <Card key={index} id={`disc-card-${index}`}>
                  <div className="px-3">
                    <span className="d-flex flex-row" style={{ gap: "5px" }}>
                      <span className="pt-1">
                        <Card.Img
                          src="https://static.thenounproject.com/png/5034901-200.png"
                          style={{ maxWidth: "20px", maxHeight: "20px" }}
                        />
                      </span>
                      {disc.User.username}
                    </span>
                  </div>
                  <Card.Body className="bg-light px-3">
                    {disc.question_text}
                    <Button
                      style={{ float: "right", padding: "0" }}
                      variant="secondary"
                      onClick={(e) => addInput(e)}
                    >
                      <SVGPlus identifier={disc.id} index={index} />
                    </Button>

                    <div className="ml-3 px-3 pt-1">
                      {disc?.Discussion_reply.length
                        ? disc.Discussion_reply.map((val, idx) => (
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
                                  <span>{val.User.username}</span>
                                </div>
                                <Card.Body className="bg-light pl-3 py-0">
                                  {val.reply_text}
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
        {discussionPage > 1 ? (
          <Card.Body>
            <Card className="p-3">
              <Card.Header>
                Page:{" "}
                {[...Array(discussionPage)].map((value, index) => (
                  <Button
                    variant="secondary"
                    onClick={() => handlePagination(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Card.Header>
            </Card>
          </Card.Body>
        ) : null}
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
