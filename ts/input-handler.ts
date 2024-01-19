class InputHandlerC {
    public static INPUTS = ["trim1", "eac1", "trim2", "eac2", "trim3", "eac3"];

    public constructor () {
        for (let i = 0; i < InputHandlerC.INPUTS.length; i++) {
            let elem = <HTMLInputElement>document.getElementById(InputHandlerC.INPUTS[i]);
            elem.addEventListener("input", (event) => {
                if (this._checkInputValidity(elem, <InputEvent>event)) Tool.update();
                else this._backspace(elem);
            })
        }
    }

    private _checkInputValidity(element: HTMLInputElement, event: InputEvent): boolean {
        var input_char  = event.data;
        var input_value = element.value;

        if (event.inputType == "deleteContentBackward") return true;

        if (input_char == null) return false;
        if (!/[0-9]|\.|,/.test(input_char)) return false;
        if (/\.|,/.test(input_char) && input_value.length != 2) return false;

        if (input_value.length > 3) return false;
        if (input_value == "100") return false;
        if (input_value.match(/\.|,/g) != null && (<Array<string>>input_value.match(/\.|,/g)).length > 1) return false;
        if (input_value.length == 2 && !/\.|,|0/.test(input_char)) return false;

        var input_integer = input_value.replace(/\.|,/, "");
        if (input_value == "10" || input_value.length == 1) input_integer += "0";
        if (parseInt(input_value) > 10) return false;
        if (parseInt(input_integer) > 100) return false;

        return true;
    }

    private _backspace(element: HTMLInputElement): void {
        element.value = element.value.slice(0, element.value.length - 1);
    }
}
