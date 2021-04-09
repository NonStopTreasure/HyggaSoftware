import React from "react"
import { Column, Row } from "components/Layout"
import {
  ITaskFileModel,
  ITaskItemModel,
  ITaskTriesModel,
} from "common/interfaces"
import { AlignItemsTypes, JustifyContentTypes, MarginTypes } from "common/enums"
import { CheckOutlined, CloseOutlined, FileFilled } from "@ant-design/icons"
import { format } from "date-fns"
import doubleCheck from "./doubleCheck.svg"
import { deleteFile, taskRequest } from "common/api/TaskInfo"
import { AxiosResponse } from "axios"
import { UploadFile } from "antd/lib/upload/interface"

interface ISentListProps {
  FileSentList: ITaskTriesModel[]
  TaskItem: ITaskItemModel
  FileUploadList: UploadFile[]
  subjectId: string
  SetNewTask: (newTask: ITaskItemModel[]) => void
  changeIsUploadListOpen: (state: boolean) => void
  dottedFileName: (fileName: string) => string
}

const SentList = (props: ISentListProps): React.ReactElement => {
  const {
    changeIsUploadListOpen,
    FileSentList,
    SetNewTask,
    subjectId,
    TaskItem,
    FileUploadList,
    dottedFileName,
  } = props

  const checkViewed = (
    fileId: string,
    triesId: string,
    files: ITaskFileModel[]
  ): React.ReactElement => (
    <Column
      margin={MarginTypes.right_x2}
      widthAuto
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.center}
      classes="sent-file-del"
      onClick={async (): Promise<void> => {
        await deleteFile(fileId, triesId)
        const newTask: AxiosResponse = await taskRequest(subjectId)
        SetNewTask(newTask.data)
        FileSentList.length === 1 &&
        files.length === 1 &&
        FileUploadList.length === 0
          ? changeIsUploadListOpen(false)
          : changeIsUploadListOpen(true)
      }}
    >
      <CloseOutlined />
    </Column>
  )

  const modeOfViewed = (check: boolean): React.ReactElement => {
    if (check) {
      return (
        <>
          <img
            className="check-span_double"
            src={doubleCheck}
            alt={"doubleCheck"}
          />
        </>
      )
    }
    return <CheckOutlined />
  }
  if (FileSentList !== null && FileSentList.length !== 0) {
    return (
      <Column classes="file-list-sent">
        <Column
          jc={JustifyContentTypes.center}
          ai={AlignItemsTypes.center}
          classes="sent-box"
        >
          {TaskItem.tries ? (
            <Row
              classes="sent-box__header"
              jc={JustifyContentTypes.spaceAround}
              ai={AlignItemsTypes.center}
            >
              <Column widthAuto>
                <p className="header__text">Отправленные файлы</p>
              </Column>
              <Column margin={MarginTypes.left}>
                <span className="header__span" />
              </Column>
            </Row>
          ) : null}
        </Column>

        <Column classes="sent-box__content">
          {TaskItem.tries.map(
            (tries: ITaskTriesModel): React.ReactElement => (
              <Column
                key={tries.id}
                classes="content-box"
                jc={JustifyContentTypes.spaceBetween}
              >
                <Row
                  widthAuto
                  ai={AlignItemsTypes.center}
                  classes="sent-info"
                  jc={JustifyContentTypes.spaceBetween}
                >
                  <Row
                    jc={JustifyContentTypes.flexStart}
                    ai={AlignItemsTypes.center}
                    classes="sent-info-date-check"
                  >
                    <Column widthAuto classes="date-check__box">
                      <p className="date__text">
                        {format(new Date(tries.date), "dd.MM.yyyy")}
                      </p>
                    </Column>
                    <Column classes="check">
                      {modeOfViewed(tries.viewed)}
                    </Column>
                  </Row>
                  <Column classes="sent-info-try-mark">
                    {tries.mark === null ? null : (
                      <p className="try-mark__text">Оценено: {tries.mark} б.</p>
                    )}
                  </Column>
                </Row>

                {tries.files.map(
                  (fileItem: ITaskFileModel): React.ReactElement => (
                    <Row
                      key={fileItem.id}
                      ai={AlignItemsTypes.center}
                      jc={JustifyContentTypes.spaceBetween}
                      classes="sent-file"
                    >
                      <Row
                        widthAuto
                        ai={AlignItemsTypes.center}
                        jc={JustifyContentTypes.center}
                      >
                        <Column classes="sent-file__icon" widthAuto>
                          <FileFilled className="img" />
                        </Column>

                        <Column widthAuto classes="sent-file-info">
                          <Row
                            jc={JustifyContentTypes.center}
                            ai={AlignItemsTypes.center}
                            classes="info-name"
                          >
                            <p>{dottedFileName(fileItem.name)}</p>
                          </Row>
                          <Row classes="info-date-and-size">
                            <p className="size__text">
                              {fileItem.size / 1024 > 1024
                                ? (fileItem.size / 1024 / 1024).toFixed(1) +
                                  "MB"
                                : fileItem.size / 1024 > 1
                                ? (fileItem.size / 1024).toFixed(1) + "KB"
                                : fileItem.size + "B"}
                            </p>
                            <p className="date__text">
                              {format(new Date(fileItem.date), "HH:mm")}
                            </p>
                          </Row>
                        </Column>
                      </Row>
                      {tries.viewed
                        ? null
                        : checkViewed(fileItem.id, tries.id, tries.files)}
                    </Row>
                  )
                )}
              </Column>
            )
          )}
        </Column>
      </Column>
    )
  }
  return (
    <div>
      <div />
    </div>
  )
}

export { SentList }
