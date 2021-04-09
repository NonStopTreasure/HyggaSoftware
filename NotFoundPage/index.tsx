import React, { FC } from "react"
import { RouteProps, NavLink } from "react-router-dom"
import { Button, Col, Row } from "antd"
import { useSpring, animated } from "react-spring"
import { Header } from "components/Header"
import { Icon } from "components/Icon"
import pencils from "./img/pencil.svg"
import pencilsMob from "./img/pencil_mob.svg"
import imgList from "./config.json"
import { useResponse } from "common/utils/reposnsive"

import "./style.scss"

const NotFoundPage: FC<RouteProps> = (): React.ReactElement => {
  const { mobile, mobileMedium } = useResponse()
  const calc = (x: number, y: number): number[] => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2,
  ]
  const trans1 = (x: number, y: number): string =>
    `translate3d(${x / 80}px,${y / 80}px,0)`
  const trans2 = (x: number, y: number): string =>
    `translate3d(${x / 20}px,${y / 20}px,0)`

  const [props, setProps] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  return (
    <Col
      className="not-found-page"
      onMouseMove={({
        clientX: x,
        clientY: y,
      }: {
        clientX: number
        clientY: number
      }): void => {
        setProps({ xy: calc(x, y) })
      }}
    >
      <Header isMobile={mobile} className="page-header_mobile" />
      <Row className="content">
        <Col className="content-info">
          <Col className="content-info__title-col">
            <h1 className="title__text">
              {mobile ? "Упс! Произошла ошибка..." : "Произошла ошибка..."}
            </h1>
          </Col>

          <Col className="content-info__description-col">
            <p className="description__text">
              Кажется, что-то пошло не так! Страница, которую вы запрашиваете не
              существует. Возможно, она была удалена, или вы набрали неверный
              адрес.
            </p>
          </Col>

          <Col className="content-info__return-col">
            <Button className="return__btn">
              <NavLink to={"/"}>
                <p className="return__btn-text">Назад в приложение</p>
              </NavLink>
            </Button>
          </Col>
        </Col>

        <Col className="content-error">
          <Col className="content-error__col">
            <img
              className={
                mobile ? "content-error__img_mobile" : "content-error__img"
              }
              src={mobile ? pencilsMob : pencils}
              alt="pencil-img"
            />
            <p className="content-error__text">404</p>
          </Col>
        </Col>
      </Row>
      <Col className="parallax">
        {!mobile &&
          imgList.map(
            (item: {
              type: string
              alt: string
              mode: string
            }): React.ReactElement =>
              !mobileMedium ? (
                <animated.div
                  className={
                    "parallax-item-position parallax-item_" + item.type
                  }
                  style={{
                    transform: props.xy.interpolate(
                      item.mode === "none" ? trans2 : trans1
                    ),
                  }}
                  key={item.alt}
                >
                  <Icon
                    className={
                      `${mobileMedium ? "mobile" : ""} parallax_filter-${
                        item.mode
                      } img_` + item.type
                    }
                    icon={item.type}
                    alt={item.alt}
                  />
                </animated.div>
              ) : (
                <div
                  className={
                    "parallax-item-position parallax-item_" + item.type
                  }
                  key={item.alt}
                >
                  <Icon
                    className={
                      `${mobileMedium ? "mobile" : ""} parallax_filter-${
                        item.mode
                      } img_` + item.type
                    }
                    icon={item.type}
                    alt={item.alt}
                  />
                </div>
              )
          )}
      </Col>
    </Col>
  )
}

export { NotFoundPage }
