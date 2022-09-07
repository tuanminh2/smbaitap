import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Drawler.css';
function Drawler() {
  let navigate = useNavigate();

  let hdlToggleBtn = () => {
    let nav = document.getElementById('nav');
    let navWidth = nav.clientWidth;
    let header = document.getElementById('appHeader');
    let curVisibility = nav.style.visibility;

    curVisibility = curVisibility === '' ? 'visible' : curVisibility;

    nav.style.visibility = curVisibility === 'hidden' ? 'visible' : 'hidden';
    nav.style.transform = curVisibility == 'hidden' ? '' : 'translateX(-100%)';

    if (curVisibility == 'visible') {
      header.style.transform = `translateX(-${navWidth}px)`;
      header.style.width = '100%';
    } else {
      header.style.transform = '';
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="overlay__scrim"></div>
        <div className="overlay__content"></div>
      </div>
      <div className="app-wrapper">
        <nav id="nav" className="nav">
          <div className="nav-content">
            <div className="list-item">
              <div className="list-item__content">
                <div className="list-item__title text-h6">
                  Student Management App
                </div>
                <div className="list-item__subtitle">Dashboard</div>
              </div>
            </div>
            <hr
              role="separator"
              aria-orientation="horizontal"
              className="divider"
            />
            <div className="main-list">
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  navigate('/calendar');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="list-item__title">Calender</div>
                </div>
              </a>
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  navigate('/task');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="v-list-item__title">Tasks</div>
                </div>
              </a>
              <a
                href=""
                aria-current="page"
                className="main-list-item"
                onClick={() => {
                  navigate('/student');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="main-list-item__title">Student List</div>
                </div>
              </a>
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  navigate('/student/add');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="main-list-item__title">Add a Student</div>
                </div>
              </a>
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  navigate('/student/edit');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="main-list-item__title">Assign Teams</div>
                </div>
              </a>
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  navigate('/about');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="main-list-item__title">About</div>
                </div>
              </a>
              <a
                href=""
                className="main-list-item"
                onClick={() => {
                  localStorage.removeItem('jwtToken');
                  navigate('/login');
                }}
              >
                <div className="main-list-item__icon">
                  <i className="fas fa-user-alt"></i>
                </div>
                <div className="main-list-item__content">
                  <div className="main-list-item__title">Logout</div>
                </div>
              </a>
            </div>
          </div>
          <div className="v-navigation-drawer__border"></div>
        </nav>

        <header id="appHeader" className="app-header">
          <div className="toolbar__content">
            <button
              onClick={hdlToggleBtn}
              type="button"
              id="toggleDrawlerBtn"
              className="toggledrawler-btn"
            >
              <span className="btn__content">
                <i className="fas fa-sliders-h"></i>
              </span>
            </button>
            <div className="toolbar__title app-bar-title">
              <div className="app-bar-title__content">Task Manager</div>
            </div>
            <div className="spacer"></div>
          </div>
        </header>
      </div>
    </>
  );
}
export default Drawler;
