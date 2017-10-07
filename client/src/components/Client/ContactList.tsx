import * as React from "react";
import ClientContact from "../../classes/clientContact"
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import FontAwesome from "react-fontawesome";

export interface Props {
    contacts: ClientContact[];
    onContactEdit: any;
    onAddContact: any;
}

export interface State {
}

@translate(['client', 'countries'], {wait: true})
export class ContactList extends React.Component<Props, State> {

    render() {
        const {t} : any = this.props

        return (
            <div>
                <div className="controls-above-table">
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn btn-sm btn-primary" onClick={(e) => this.props.onAddContact(e)}><FontAwesome name="plus-square"/>&nbsp;&nbsp;Ajouter</button>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{t('common:email')}</th>
                            <th>{t('common:lastName')}</th>
                            <th>{t('common:firstName')}</th>
                            <th>{t('common:phone')}</th>
                            <th>{t('common:actions')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.contacts.map((contact, index) =>
                                <tr key={index}>
                                    <td>{contact.email}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary" onClick={(e) => this.props.onContactEdit(contact)}>
                                            <FontAwesome name="pencil-square-o" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
