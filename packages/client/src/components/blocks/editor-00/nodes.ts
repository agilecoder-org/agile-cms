import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical"

import { ImageNode } from "@/components/editor/nodes/image-node"
import { InlineImageNode } from "@/components/editor/nodes/inline-image-node"

import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { OverflowNode } from "@lexical/overflow"
import { TableNode } from "@lexical/table"
import { TableCellNode } from "@lexical/table"
import { TableRowNode } from "@lexical/table"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { TweetNode } from "@/components/editor/nodes/embeds/tweet-node"
import { EmojiNode } from "@/components/editor/nodes/emoji-node"
import { EquationNode } from "@/components/editor/nodes/equation-node"
import { YouTubeNode } from "@/components/editor/nodes/embeds/youtube-node"

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode, 
    ParagraphNode, 
    TextNode, 
    QuoteNode, 
    ListNode, 
    ListItemNode, 
    AutoLinkNode, 
    LinkNode,
    CodeNode,
    CodeHighlightNode,
    ImageNode,
    InlineImageNode,
    OverflowNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    ImageNode,
    EmojiNode,
    EquationNode,
    AutoLinkNode,
    TweetNode,
    YouTubeNode
  ]
