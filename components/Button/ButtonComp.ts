import styled from 'styled-components';

interface ButtonProps {
  readonly buttonType?: string;
  readonly size?: string;
  readonly bg?: string;
  readonly as?: string;
  readonly href?: string;
}

const PrimaryColor = '#076775';
const SecondaryColor = '#F65940';

function bgColor(type: string, bg: string) {
  if (bg) {
    return bg;
  } else {
    switch (type) {
      case 'primary':
        return PrimaryColor;
      case 'secondary':
        return SecondaryColor;
      default:
        return 'transparent';
    }
  }
}

function color(type: string) {
  if (type == 'primary' || type == 'secondary') return 'white';
  else if (type == 'primary-outline') return PrimaryColor;
  else return SecondaryColor;
}

function border(type: string) {
  if (type == 'primary' || type == 'secondary') return 'none';
  else if (type == 'primary-outline') return `2px solid ${PrimaryColor}`;
  else return `2px solid ${SecondaryColor}`;
}

function buttonSize(size: string, type: string) {
  if (type == 'primary-outline' || type == 'secondary-outline') {
    if (size == 'sm') return '6px 10px';
    else return '10px 22px';
  } else {
    if (size == 'sm') return '8px 12px';
    else return '12px 24px';
  }
}

function buttonFont(size: string) {
  if (size == 'sm') return '12px';
  else return '1rem';
}

const ButtonComp = styled.button<ButtonProps>`
  padding: ${(props: any) => buttonSize(props.size, props.buttonType)};
  font-size: ${(props: any) => buttonFont(props.size)};
  font-weight: bold !important;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  background-color: ${(props: any) => bgColor(props.buttonType, props.bg)};
  border: ${(props: any) => border(props.buttonType)};
  color: ${(props: any) => color(props.buttonType)};
`;

export default ButtonComp;
