import React, { PureComponent } from 'react';
import ReactSelect from 'react-select';
import { Field, reduxForm } from 'redux-form';

import { Languages } from '../lib';
import './TranslationSettings.css';


class TranslationSettings extends PureComponent {
  onSelectLanguage = (organizationSelection) => {
    const {
      selectLanguage,
    } = this.props;

    const selectedActiveLanguageId = organizationSelection.value.id;
    selectLanguage({ languageId: selectedActiveLanguageId });
  };


  renderSelectField = ({ options, change }) => {
    const defaultValue = {
      label: Languages[0].name,
      value: Languages[0].id,
    };

    return (
      <div>
        <ReactSelect
          className="ol-select"
          defaultValue={defaultValue}
          isClearable={false}
          options={options}

          onChange={change}
        />
      </div>
    );
  };

  render() {
    const options = Languages.map(language => {
      const { id, name } = language;

      return {
        label: name,
        value: {
          id,
          name,
        }
      };
    });

    return (
      <form className="ol-translation-form">
        <Field
          component={this.renderSelectField}
          options={options}

          change={this.onSelectLanguage}
        />
      </form>
    );
  }
}

function validate(values) {
  let errors = {};

  return errors;
}

TranslationSettings = reduxForm({
  validate,
  form: 'translationForm',
})(TranslationSettings);

export default TranslationSettings;
