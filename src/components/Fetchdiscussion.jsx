import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";

function FetchDiscussion({ eventid, users_map, events_map }) {
  const [discussionscontainer, setDiscussionscontainer] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);

  const load_discussion = async () => {
    const res_dis = await api.get(`discussions`);
    console.log(`aaa`, res_dis);
    const thiseventdiscus = [...res_dis.data];
    console.log(`thiseventdiscus`, thiseventdiscus);
    const temp_fil = thiseventdiscus.filter((rev) => rev.eventid == eventid)[0];
    setDiscussionscontainer(temp_fil);
    console.log(`here`, discussionscontainer);
  };
  console.log("liwat sini");

  useEffect(() => {
    load_discussion();
  }, []);

  useEffect(() => {
    load_discussion();
  }, [activitycounter]);
  console.log(`discus`, discussionscontainer);
  if (discussionscontainer) {
    return (
      <>
        {discussionscontainer.question?.length
          ? discussionscontainer.question?.map((disc, index) => (
              <Card key={index}>
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
                        .username
                    ) : (
                      <Spinner />
                    )}
                  </span>
                </div>
                <Card.Body className="bg-light px-3">
                  {disc}
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
                                      discussionscontainer.reply_id[index][idx]
                                    ).username
                                  }
                                </span>
                              </div>
                              <Card.Body className="bg-light px-3 py-0">
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
      </>
    );
  } else return <span>This event has no discussion</span>;
}

export default FetchDiscussion;
