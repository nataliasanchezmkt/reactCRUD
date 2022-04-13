// Reg expressions
const regExpProductName = /^[A-Za-z\s?]+$/;
const regExpPrice = /[0-9]+$/;
const regExpUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
const regExpCategory = /^[A-Za-z\-\s?]+$/;
const regExp4Pass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$/;
const regExp4Email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


// Functions to validate
export const validateProductName = (field) => {
  if (regExpProductName.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validatePrice = (field) => {
  if (
    regExpPrice.test(field) &&
    field.trim() !== "" &&
    field.trim() > 0 &&
    field.trim() < 2000
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateUrl = (field) => {
  console.log(field);
  if (regExpUrl.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateCategory = (field) => {
  if (
    regExpCategory.test(field) &&
    field.trim() !== "" &&
    (field === "hot drinks" ||
      field === "cold drinks" ||
      field === "sandwich" ||
      field === "sweet" ||
      field === "salty")
  ) {
    return true;
  } else {
    return false;
  }
};


export const validateEmail = (campo)=>{
  if(regExp4Email.test(campo)){
    return true
  }else{
    return false
  }
}

export const validatePassword = (campo)=>{
  if(regExp4Pass.test(campo)){
    return true
  }else{
    return false
  }

}