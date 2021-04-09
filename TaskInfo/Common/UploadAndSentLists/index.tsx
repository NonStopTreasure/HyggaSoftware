import React from "react"
import { UploadFile } from "antd/lib/upload/interface"
import { Column } from "components/Layout"
import { ITaskItemModel, ITaskTriesModel } from "common/interfaces"
import { getDottedFileName } from "common/utils/getDottedText"
import { UploadList } from "./UploadList"
import { SentList } from "./SentList"

interface IUploadAndSentListsProps {
  FileUploadList: UploadFile[]
  FileSentList: ITaskTriesModel[]
  TaskItem: ITaskItemModel
  reSetFileList: (newArr: UploadFile[]) => void
  changeIsUploadListOpen: (state: boolean) => void
  subjectId: string
  SetNewTask: (newTask: ITaskItemModel[]) => void
}

const UploadAndSentLists = ({
  changeIsUploadListOpen,
  FileSentList,
  FileUploadList,
  reSetFileList,
  SetNewTask,
  subjectId,
  TaskItem,
}: IUploadAndSentListsProps): React.ReactElement => {
  const getDotted = (name: string): string => getDottedFileName(name, 20)

  return (
    <Column classes="file-lists">
      <UploadList
        FileUploadList={FileUploadList}
        reSetFileList={reSetFileList}
        changeIsUploadListOpen={changeIsUploadListOpen}
        FileSentList={FileSentList}
        dottedFileName={getDotted}
      />
      <SentList
        FileSentList={FileSentList}
        TaskItem={TaskItem}
        subjectId={subjectId}
        SetNewTask={SetNewTask}
        changeIsUploadListOpen={changeIsUploadListOpen}
        FileUploadList={FileUploadList}
        dottedFileName={getDotted}
      />
    </Column>
  )
}

export { UploadAndSentLists }
