/* eslint-disable class-methods-use-this */
const paymentUrl = 'https://payment.paytrail.com/e2';
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        width: 200px;
        padding: 1rem;
    }

    input[type="submit"] {
        cursor: pointer;
        height: 100%;
        width: 100%;
        background: #e60094;
        color: #FFF;
        font-weight: 600;
        border: none;
        padding: 16px 44px;
        font-size: 14px;
        text-transform: uppercase;

        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
<form action=${paymentUrl} method="POST">

</form>
`;

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const requiredFields = [
    'merchant_id',
    'url_success',
    'url_cancel',
    'order_number',
    'amount',
    'params_in',
    'params_out',
];

const requiredParamsOut = ['payment_id', 'timestamp', 'status'];

const requiredProductFields = ['item_title', 'item_unit_price', 'item_vat_percent'];
const allProductFields = [...requiredProductFields, 'item_id', 'item_quantity', 'item_discount_percent', 'item_type'];

export class PayTrail extends HTMLElement {
    constructor() {
        super();

        this._initializeFields();
        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));
    }

    _initializeFields() {
        this.products = [];
        this.merchant_authentication_hash = '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ';
        this.submit_button_label = 'Pay here';
        this.merchant_id = '13466';
        this.currency = 'EUR';
        this.amount = '0.00';
        this.alg = 1;
        this.locale = 'fi_FI';
        this.vat_is_included = 1;
        this.order_number = this._generateOrderNumber();
        const placeHolderUrl = this._getPlaceholderUrl();
        this.url_success = placeHolderUrl;
        this.url_cancel = placeHolderUrl;
        this.params_in = requiredFields.reduce((a, b) => `${a.toUpperCase()},${b.toUpperCase()}`);
        this.params_out = requiredParamsOut.reduce((a, b) => `${a.toUpperCase()},${b.toUpperCase()}`);
        this.authcode = '';
        this.background_image = null;
    }

    _getPlaceholderUrl() {
        let currentUrl = window.location.href;
        if (currentUrl.includes('localhost')) {
            // Localhost is not supported by paytrail url schema
            currentUrl = currentUrl.replace('localhost', '127.0.0.1');
        }
        return currentUrl;
    }

    getAuthCodeString() {
        let authCodeString = '';
        this.params_in.split(',').forEach(paramName => {
            authCodeString += `|${this.shadowRoot.querySelector(`input[name=${paramName}]`).value}`;
        });
        return authCodeString;
    }

    calculateAuthCodeString() {
        console.warn(
            `It is not suggested to generate the AUTHCODE in the frontend, since you will be exposing your merchant_authentication_hash. \n\nIf this is a development setup, you can ignore this message, but in a production environment you should calculate the AUTHCODE in the backend.\n\nUse getAuthCodeString() instead to get the authcode string without the mechant authentication hash. `
        );
        const authCodeString = `${this.merchant_authentication_hash}${this.getAuthCodeString()}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(authCodeString);
        crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            this.authcode = hash.toUpperCase();
            this.update();
        });
    }

    getProducts() {
        return this.products;
    }

    setProducts(products) {
        if (Array.isArray(products)) {
            this.products = products;
        } else {
            this.products = [products];
        }
        this._updateAmountFieldValue();
        this.update();
    }

    addProducts(products) {
        if (Array.isArray(products)) {
            this.products = [...this.products, ...products];
        } else {
            this.products = [...this.products, products];
        }
        this._updateAmountFieldValue();
        this.update();
    }

    removeProduct(product) {
        this.products = this.products.filter(p => p !== product);
        this._updateAmountFieldValue();
        this.update();
    }

    removeProductAtIndex(index) {
        if (index > this.products.length) {
            return;
        }
        this.products.splice(index, 1);
        this._updateAmountFieldValue();
        this.update();
    }

    _generateOrderNumber() {
        let paymentIdString = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 64; i += 1) {
            paymentIdString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return paymentIdString;
    }

    _updateAmountFieldValue() {
        const newValue = this._calculateAmountFieldValue();
        this.amount = newValue;
        this.shadowRoot.querySelector('input[name=AMOUNT]').value = newValue;
    }

    _calculateAmountFieldValue() {
        return this.products.length < 1
            ? '0.00'
            : this.products.reduce((a, b) => a + Number(b.item_unit_price), 0).toFixed(2);
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[attributeName] = newValue;
        this.update();
    }

    connectedCallback() {
        this._checkRequiredFields();
        this._generateFields();
    }

    update() {
        this._generateFields();
    }

    _checkRequiredFields() {
        const splitParamsOut = this.params_out ? this.params_out.toLowerCase().split(',') : [];
        requiredParamsOut.forEach(paramOut => {
            if (!splitParamsOut.includes(paramOut.toLowerCase())) {
                throw Error(
                    `PARAMS_OUT doesn't include all of the required fields.\nRequired fields:\n\n${requiredParamsOut.map(
                        pout => `${pout.toUpperCase()}\n`
                    )}`
                );
            }
        });
    }

    async _generateFields() {
        const form = this.shadowRoot.querySelector('form');
        form.innerHTML = '';

        const fields = this.params_in ? this.params_in.split(',') : [];
        this._populateRequiredFields(fields);

        const documentFragment = document.createDocumentFragment();
        this._generateInputFields(documentFragment, fields);
        this._generateProductFields(documentFragment);
        this._generateSubmitButton(documentFragment);

        form.appendChild(documentFragment);
        this._generateAuthcodeInputField(form);
    }

    _populateRequiredFields(fields) {
        requiredFields.forEach(reqField => {
            let uppercaseFieldName = reqField.toUpperCase();
            if (!fields.includes(uppercaseFieldName)) {
                fields.push(uppercaseFieldName);
            }
        });
    }

    _generateInputFields(documentFragment, fields) {
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.toUpperCase();
            switch (input.name) {
                default:
                    input.value = this[field.toLowerCase()] || '';
                    break;
            }
            documentFragment.appendChild(input);
        });
    }

    _generateProductFields(documentFragment) {
        this.products.forEach((prod, i) => {
            this._checkRequiredProductFields(prod);
            allProductFields.forEach(prodField => {
                if (typeof prod[prodField] !== 'undefined') {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = `${prodField.toUpperCase()}[${i}]`;
                    input.value = prod[prodField];
                    documentFragment.appendChild(input);
                }
            });
        });
    }

    _checkRequiredProductFields(product) {
        requiredProductFields.forEach(reqField => {
            if (!product[reqField]) {
                throw new Error(`Required product field ${reqField} not found in product `, product);
            }
        });
    }

    _generateSubmitButton(documentFragment) {
        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        if (!this.background_image) {
            submitButton.value = this.submit_button_label;
        } else {
            submitButton.style.backgroundColor = 'transparent';
            submitButton.style.backgroundImage = `url('${this.background_image}')`;
            submitButton.value = '';
        }
        documentFragment.appendChild(submitButton);
    }

    _generateAuthcodeInputField(form) {
        const authCodeInput = document.createElement('input');
        authCodeInput.type = 'hidden';
        authCodeInput.name = 'AUTHCODE';
        authCodeInput.value = this.authcode;
        form.appendChild(authCodeInput);
    }

    static get observedAttributes() {
        return [
            'submit_button_label',
            'merchant_authentication_hash',
            'merchant_id',
            'url_success',
            'url_cancel',
            'order_number',
            'amount',
            'params_in',
            'params_out',
            'alg',
            'authcode',
            'url_notify',
            'locale',
            'reference_number',
            'payment_methods',
            'vat_is_included',
            'msg_settlement_payer',
            'msg_ui_payment_method',
            'msg_ui_merchant_panel',
            'expiration_for_payment_creation',
            'payer_person_firstname',
            'payer_person_lastname',
            'payer_person_email',
            'payer_person_phone',
            'payer_person_addr_street',
            'payer_person_addr_postal_code',
            'payer_person_addr_town',
            'payer_person_addr_country',
            'payer_company_name',
            'authcode',
            'background_image',
        ];
    }
}

if (!customElements.get('pay-trail')) {
    customElements.define('pay-trail', PayTrail);
}
