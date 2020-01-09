// Manipulate Number input fields and Password fields for Pin to not accept anything other than numbers
export const manipulateNumber = (e) => {
    var inputKeyCode = e.key;
    if (((inputKeyCode >=0 && inputKeyCode <= 9) )&& (inputKeyCode != null)){
        if((e.target.value.length === e.target.maxLength) || (inputKeyCode === 45)){
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }