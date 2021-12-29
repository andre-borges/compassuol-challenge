import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function CardUser({ user, home }) {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  function getRepos() {
    !repos.length &&
      api
        .get(`/${user.login}/repos`)
        .then((response) => {
          const { data } = response;
          console.log(data);
          setRepos(data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
  }

  function getFavoritos() {
    !favoritos.length &&
      api
        .get(`/${user.login}/starred`)
        .then((response) => {
          const { data } = response;
          console.log(data);
          setFavoritos(data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
  }

  function verMaisDetalhes() {
    navigate(`/${user.login}`);
  }

  return (
    <>
      {user && (
        <div className="row justify-content-center card-user">
          <div className="col-md-12 text-center">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="img-fluid rounded-circle"
            ></img>
            <h5 className="mt-3">{user.name}</h5>
            {home && (
              <button
                type="button"
                className="btn btn-primary mt-3 mb-5"
                onClick={verMaisDetalhes}
              >
                Ver mais detalhes
              </button>
            )}
          </div>
          <div className="col-md-12 text-center">
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#repositorios"
                      aria-expanded="true"
                      aria-controls="repositorios"
                      onClick={getRepos}
                    >
                      Repositórios
                    </button>
                  </h5>
                </div>

                <div
                  id="repositorios"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {repos.map((repo) => (
                      <div key={repo.id} className="border-bottom p-2">
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                          {repo.full_name}
                        </a>
                        {repo.description && <span> - {repo.description}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#favoritos"
                      aria-expanded="true"
                      aria-controls="favoritos"
                      onClick={getFavoritos}
                    >
                      Favoritos
                    </button>
                  </h5>
                </div>

                <div
                  id="favoritos"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {favoritos.map((favorito) => (
                      <div key={favorito.id} className="border-bottom p-2">
                        <a href={favorito.html_url} target="_blank" rel="noreferrer">
                          {favorito.full_name}
                        </a>
                        {favorito.description && <span> - {favorito.description}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
