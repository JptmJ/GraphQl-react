import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_MEDIA = gql`
  query {
    Page {
      media {
        title {
          english
        }
        description
      }
    }
  }
`;

function Media() {
  const { loading, error, data } = useQuery(GET_MEDIA);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div class="spinner-grow" role="status">
          <span class="visually-hidden"></span>
        </div>
      </div>
    );
  if (error)
    return (
      <div class="alert alert-danger my-5 container" role="alert">
        <h4 class="alert-heading">No data available !</h4>
      </div>
    );

  return (
    <div>
      <div className="container">
        <h2 className="text-center mt-5 mb-4">Media</h2>
        <div className="row">
          {data.Page.media.map((item, index) => (
            <div key={item.title.english || index} className="col-md-6 mb-4">
              <div className="card border-secondary h-100">
                <div className="card-body">
                  {item.title.english ? (
                    <h5 className="card-title text-primary">
                      {item.title.english}
                    </h5>
                  ) : (
                    <h5 className="card-title text-danger">No title</h5>
                  )}
                  <hr />
                  {item.description ? (
                    <p className="card-text">{item.description}</p>
                  ) : (
                    <p className="card-text text-muted">No description</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Media;
