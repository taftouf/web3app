import * as React from 'react';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { connectWallet} from '../features/account/accountSlice'


const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButtonRoot = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 1rem;
  background-color: ${blue[500]};
  padding: 24px 48px;
  border-radius: 36px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function UnstyledButtonsSimple() {
  const dispatch = useDispatch();

  return (
    <Stack>
      <CustomButton onClick={async()=>{await dispatch(connectWallet())}}>Connect Wallet</CustomButton>
    </Stack>
  );
}
