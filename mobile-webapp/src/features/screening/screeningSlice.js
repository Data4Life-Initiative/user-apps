import { createSlice } from '@reduxjs/toolkit';
import * as R from 'rambda';
;

export const slice = createSlice({
  name: 'screening',
  initialState: {
    questionPages: [{
      page: 0,
      title: 'Before you start',
      description: 'If you have any of these symptons you should stop and call an ambulance.',
      type: 'warning',
      items: [
        'Constant chest pain or pressure.',
        'Extreme difficulty breathing.',
        'Severe, constant dizziness or light headedness.',
        'Slurred speech.',
        'Difficulty waking up.'
      ]
    }, {    
      page: 1,
      title: 'Are you experiencing any of these symptoms?',
      type: 'question',
      description: 'Select all that apply.',
      multiple: true,
      items: [
        'Fever, chills or sweating.',
        'Difficulty breathing (not severe).',
        'New or worsening cough.',
        'Sore throat.',
        'Aching throughout the body.',
        'Vomiting or diarrhea.',
        'None of the above.'
      ]
    }, {    
      page: 2,
      title: 'Do you have any of these conditions?',
      type: 'question',
      description: 'Select all that apply.',
      multiple: true,
      items: [
        'Asthma or chronic lung disease.',
        'Pregnancy.',
        'Diabetes with complications.',
        'Diseases or conditions that make it harder to cough.',
        'Kidney failure that needs dialysis.',
        'Cirrhosis of the liver.',
        'Weakened immune system.',
        'Congestive heart failure.',
        'Extreme obesity.',
        'Non of the above.',
      ]
    }, {    
      page: 4,
      title: 'In the last 14 days, have you been in an area where COVID-19 is widespread?',
      type: 'question',
      description: 'Select all that apply.',
      multiple: false,
      items: [
        'I live in an area where COVID-19 is widespread.',
        'I have visited an area where COVID-19 is widespread.',
        'I don\'t know.',
      ]
    }, {    
      page: 5,
      title: 'In the last 14 days, what is your exposure to others who are known to have COVID-19?',
      type: 'question',
      description: 'Select all that apply.',
      multiple: true,
      items: [
        'I live with someone who has COVID-19.',
        'I\'ve had close contact with someone who has COVID-19. For 10 minutes, I was within 6 feet of someone who\'s sick or exposed to a cough or sneeze.',
        'I\'ve been near someone who has COVID-19. I was atlease 6 feet away and was not exposed to a sneeze or cough.',
        'I\'ve had no exposure. I have not been in contact with someone who\'s sick.'
      ]
    }, {    
      page: 6,
      title: 'Do you live or work in a care facility?',
      type: 'question',
      description: 'This includes a hospital, emergency room, other medical setting, or long-term facility. Select all that apply.',
      multiple: true,
      items: [
        'I live in a long-term care facility that includes nursing homes or assisted living.',
        'I have worked in a hospital or other care facility in the past 14 days. This includes volunteering.',
        'I plan to work in a hospital or other care facility in the next 14 days. This includes volunteering.',
        'No, I don\'t live or work in a care facility.'
      ]
    }]
  },
  reducers: {
    setScreeningQuestions: (state, action) => {
      state.questionPages = action.payload;
    },
  },
});

export const { setScreeningQuestions } = slice.actions;

export const selectScreeningDetails = (state) => state.screening;

export default slice.reducer;
