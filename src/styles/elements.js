import styled from "@emotion/styled";

export const Button = styled.button`
  margin-top: ${(props) => (props.margin ? "20px" : "0 px")};
  width: 130px;
  background-color: transparent;
  outline: none;
  color: #292929;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  transition: ease all 250ms;
  box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.1), -7px -7px 20px rgb(241, 255, 255);
  border: unset;
  &:hover {
    cursor: pointer;
    color: #292929;
    box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 5px rgba(241, 255, 255, 0.5);
  }
`;

export const Form = styled.form`
  border-radius: 20px;
  padding: 30px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.1),
    -7px -7px 20px rgba(241, 255, 255, 1);
  align-items: center;
`;

export const FormH1 = styled.h1`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;
export const FormH3 = styled.h3`
  text-align: center;
  width: 100%;
  margin-right: 5px;
  margin-left: 5px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 350px;
`;

export const Input = styled.input`
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.1),
    inset -3px -3px 5px rgba(241, 255, 255, 0.5);
  border-color: ${(props) => (props.error ? "red" : "black")};
  border-width: ${(props) => (props.error ? 1 : 0)};
`;

export const InputLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  width: 100%;
`;

export const InputError = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-style: italic;
  color: #b60000;
`;
