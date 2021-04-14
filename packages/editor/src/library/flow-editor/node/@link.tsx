import {ProcedureTreeNode} from '@magicflow/procedure';
import React, {CSSProperties, FC} from 'react';
import styled from 'styled-components';

export interface LinkNodeProps {
  node: ProcedureTreeNode;
  className?: string;
  readOnly?: boolean;
  style?: CSSProperties;
}

const Container = styled.div`
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: top;
  margin: 0 16px;
  pointer-events: all !important;
`;

const Content = styled.div`
  width: 64px;
  height: 32px;
  font-size: 12px;
  line-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  color: #333333;
  background-color: #fff;
`;

export const LinkNode: FC<LinkNodeProps> = ({className, style, node}) => {
  return (
    <Container style={style}>
      <Content className={className}>
        {node.type === 'singleNode'
          ? node.definition.displayName || '-'
          : 'branch'}
      </Content>
    </Container>
  );
};