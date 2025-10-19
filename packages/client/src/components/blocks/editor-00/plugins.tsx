import { useState } from "react"

// Lexical Imports
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown"

// Custom Imports
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph"
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading"
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list"
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list"
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list"
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote"
import { ClearFormattingToolbarPlugin } from "@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin"
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin"
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin"
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin"
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin"
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin"
import { Separator } from "@/components/ui/separator"
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin"
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin"
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin"
import { ClearEditorActionPlugin } from "@/components/editor/plugins/actions/clear-editor-plugin"
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin"
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin"
import { FormatCodeBlock } from "@/components/editor/plugins/toolbar/block-format/format-code-block"
import { CodeActionMenuPlugin } from "@/components/editor/plugins/code-action-menu-plugin"
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin"
import { CodeLanguageToolbarPlugin } from "@/components/editor/plugins/toolbar/code-language-toolbar-plugin"
import { DraggableBlockPlugin } from "@/components/editor/plugins/draggable-block-plugin"
import { FloatingTextFormatToolbarPlugin } from "@/components/editor/plugins/floating-text-format-plugin"
import { ImagesPlugin } from "@/components/editor/plugins/images-plugin"
import { BlockInsertPlugin } from "@/components/editor/plugins/toolbar/block-insert-plugin"
import { InsertImage } from "@/components/editor/plugins/toolbar/block-insert/insert-image"
import { InlineImagePlugin } from "@/components/editor/plugins/inline-image-plugin"
import { InsertInlineImage } from "@/components/editor/plugins/toolbar/block-insert/insert-inline-image"
import { TwitterPlugin } from "@/components/editor/plugins/embeds/twitter-plugin"
import { YouTubePlugin } from "@/components/editor/plugins/embeds/youtube-plugin"
import { EmojisPlugin } from "@/components/editor/plugins/emojis-plugin"
import { EquationsPlugin } from "@/components/editor/plugins/equations-plugin"
import { MarkdownTogglePlugin } from "@/components/editor/plugins/actions/markdown-toggle-plugin"
import { TableActionMenuPlugin } from "@/components/editor/plugins/table-action-menu-plugin"
import { TableCellResizerPlugin } from "@/components/editor/plugins/table-cell-resizer-plugin"
import { TableHoverActionsPlugin } from "@/components/editor/plugins/table-hover-actions-plugin"
import { EMOJI } from "@/components/editor/transformers/markdown-emoji-transformer"
import { EQUATION } from "@/components/editor/transformers/markdown-equation-transformer"
import { HR } from "@/components/editor/transformers/markdown-hr-transformer"
import { IMAGE } from "@/components/editor/transformers/markdown-image-transformer"
import { TABLE } from "@/components/editor/transformers/markdown-table-transformer"
import { TWEET } from "@/components/editor/transformers/markdown-tweet-transformer"
import { InsertTable } from "@/components/editor/plugins/toolbar/block-insert/insert-table"
import { InsertEmbeds } from "@/components/editor/plugins/toolbar/block-insert/insert-embeds"
import { InsertColumnsLayout } from "@/components/editor/plugins/toolbar/block-insert/insert-columns-layout"

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex flex-col gap-2 overflow-auto border-b p-1">
            <div className="flex gap-2 vertical-align-middle justify-between">
              <div className="flex gap-2 vertical-align-middle">
                <HistoryToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
                <ClearFormattingToolbarPlugin />
              </div>

              <div className="flex gap-2 vertical-align-middle">
                {blockType === "code" ? <CodeLanguageToolbarPlugin /> : <></>}
                <BlockInsertPlugin>
                  <InsertImage />
                  <InsertInlineImage />
                  <InsertTable />
                  <InsertEmbeds />
                  <InsertColumnsLayout />
                </BlockInsertPlugin>
              </div>
            </div>

            <div className="flex gap-2 vertical-align-middle">
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatCodeBlock />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>

              <FontFamilyToolbarPlugin />
              <FontSizeToolbarPlugin />

              <Separator orientation="vertical" className="!h-7" />
              <ElementFormatToolbarPlugin />

              <Separator orientation="vertical" className="!h-7" />
              <FontColorToolbarPlugin />
              <FontBackgroundToolbarPlugin />
              <LinkToolbarPlugin />
            </div>

          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="h-[calc(100vh-220px)] overflow-auto">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ListPlugin />
        <CheckListPlugin />
        <ClickableLinkPlugin />
        <HistoryPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
        <CodeHighlightPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
        <ImagesPlugin />
        <InlineImagePlugin />
        <TablePlugin />
        <TableCellResizerPlugin />
        <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
        <TableActionMenuPlugin
          anchorElem={floatingAnchorElem}
          cellMerge={true}
        />

        <EmojisPlugin />
        <EquationsPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <MarkdownShortcutPlugin
          transformers={[
            TABLE,
            HR,
            IMAGE,
            EMOJI,
            EQUATION,
            TWEET,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
      </div >
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            <MarkdownTogglePlugin shouldPreserveNewLinesInMarkdown={true} transformers={[
              TABLE,
              HR,
              IMAGE,
              EMOJI,
              EQUATION,
              TWEET,
              CHECK_LIST,
              ...ELEMENT_TRANSFORMERS,
              ...MULTILINE_ELEMENT_TRANSFORMERS,
              ...TEXT_FORMAT_TRANSFORMERS,
              ...TEXT_MATCH_TRANSFORMERS,
            ]} />
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
          </div>
          <div className="flex flex-1 justify-end">
            <>
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
            </>
          </div>
        </div>
      </ActionsPlugin>
    </div >
  )
}
