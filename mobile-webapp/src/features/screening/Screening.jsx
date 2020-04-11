import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Button, List, ListItem, ListItemText, Checkbox, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { setHealthStatus } from '../account/accountSlice';

import { selectScreeningDetails } from './screeningSlice';

const borderRadius = 18;
const fontSize = 22;
const width = '80%';
const lineHeight = 2.2;

const useStyle = makeStyles({
  container: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',    
    height: window.innerHeight,
    widtht: window.innerWidth,
    backgroundColor: 'rgb(242, 242, 242)'
  },
  screeningpagecontainer: {
    paddingTop: 12,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    fontSize: 32
  },
  screeningicon: {
    fontSize: 80,
    color: 'orangered'
  },
  reportissueicon: {
    fontSize: 18,
    color: 'red',
    paddingRight: 6,
  },
  iconbutton: {
    color: 'royalblue',
    padding: 12,
    fontSize: fontSize
  },
  selectedcheckbox: {
    color: 'royalblue',
  },
  backbutton: {
    marginLeft: -12,
    marginTop: 1,
    fontSize: fontSize
  },
  cancelbutton: {
    fontSize: fontSize
  },  
  content: {
    flex: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageheading: {
    padding: 12,
    textAlign: 'center',
    flex: 1,
    fontFamily: ['Arial'],    
    fontWeight: 600,
    color: 'grey',
    fontSize: fontSize,    
  },
  heading: {
    padding: 4,
    textAlign: 'left',
    fontFamily: ['Arial'],    
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,    
  },
  pagetext: {
    padding: 4,
    textAlign: 'left',
    fontFamily: ['Arial'],    
    fontSize: 16,
  },
  'question-list': {
    marginTop: 12,
    backgroundColor: 'white',
    borderRadius: 18,
    overflow: 'auto',
    marginBottom: 12,
  },
  'question-listitem': {
    '&:not(:last-child)': {
      borderBottom: '1px solid #ccc'
    }    
  },
  label: {
    marginTop: 15,
    color: 'rgb(150,150,150)',
    fontFamily: ['Arial'],
    fontSize: 14,
  },
  screeningButton: {
    fontSize: 14,
    lineHeight,
    width,
    marginBottom: 18,
    fontFamily: ['Arial'],
    borderRadius: 18,
    // backgroundColor: 'rgb(92,200,77)',
  },
});

const Label = ({ label }) => {
  const classes = useStyle();
  return <Typography className={classes.label}>{label}</Typography>;
};

const Screening = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const screening = useSelector(selectScreeningDetails);
  const [screeningPage, setScreeningPage] = useState(0);
  const [answers, setAnswer] = useState(null);
  const [isGoBackEnabled, setGoBackEnabled] = useState(false);
  const [isPageHeaderEnabled, setPageHeaderEnabled] = useState(false);
  const [pageHeading, setPageHeading] = useState('');

  const handleMultipleAnswer = (event) => {
    let indexOfItem = -1;
    let newArrayToSet = [];
    if(answers[event.target.name]) {
      indexOfItem = answers[event.target.name].indexOf(event.target.value);  
      newArrayToSet = answers[event.target.name];
    }    
    if(event.target.checked) {
      //add the item from the list of answers
      if(indexOfItem < 0) {
        let joined = newArrayToSet.concat(event.target.value);
        setAnswer({ ...answers, [event.target.name]:  joined });
      }
    } else {
      //remove the item from the list of answers
      if(indexOfItem > -1) {
        answers[event.target.name].splice(indexOfItem, 1);
        setAnswer({ ...answers, [event.target.name]:  answers[event.target.name] });
      }
    }
  };

  const handleSingleAnswer = (event) => {
    setAnswer({ ...answers, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (screeningPage === 0) {
      setGoBackEnabled(false);
      setPageHeaderEnabled(false);      
    } else {
      if(screening.questionPages) {
        setGoBackEnabled(true);
        setPageHeaderEnabled(true);
        setPageHeading(`${screeningPage} of ${screening.questionPages.length}`);  
      }
    }
  }, [screeningPage]);

  useEffect(() => {
    let emptyAnswers = {};
    for(const item of screening.questionPages) {      
      if(item.type === 'question') {
        emptyAnswers[item.title] = null;
        if(item.multiple) {
          emptyAnswers[item.title] = [];
        }
      }      
    }
    setAnswer(emptyAnswers);
  }, [screening]);

  const generateQuestionList = (questionPage) => {
    return questionPage.items.map((item, index) => {
      return (
        <ListItem key={index} className={classes[questionPage.type + '-listitem']}>
        {
           questionPage.type === 'warning' && (
            <ReportProblemRoundedIcon className={classes.reportissueicon} />
          )
        }
        <ListItemText
          primary={item}
        />        
        {
          questionPage.type === 'question' && (
            questionPage.multiple ? (
              <Checkbox
                checked={answers[questionPage.title].indexOf(item) > -1}
                icon={<CircleUnchecked />}
                name={questionPage.title}
                value={item}
                onChange={handleMultipleAnswer}
                checkedIcon={<CircleCheckedFilled className={classes.selectedcheckbox}/>}
              /> 
            ) : (
              <Radio
                checked={answers[questionPage.title] === item}
                name={questionPage.title}
                value={item}
                icon={<CircleUnchecked />}
                onChange={handleSingleAnswer}
                checkedIcon={<CircleCheckedFilled className={classes.selectedcheckbox}/>}
              /> 
            )
          )
       }  
       </ListItem>        
      )
    });
  }

  const completeScreening = () => {
    dispatch(setHealthStatus('healthy_susceptible'));
    dispatch(setActivePage('account'));
  }

  const getScreeningContent = (pageNumber) => {
    if (pageNumber === 0) {
      return (
        <Container className={classes.content}>
          <Container className={classes.screeningpagecontainer}>
            <AssignmentIndRoundedIcon className={classes.screeningicon} />
            <Typography className={classes.heading}>Screening</Typography>
            <Typography className={classes.pagetext}>
              You'll answer a few questions a few questions about symptoms, travel and contact you've had wit others. Your answers will not be shared with anyone but stays on your device.
            </Typography>
          </Container>
          
          <Button
            variant="contained"
            color="primary"
            className={classes.screeningButton}
            onClick={() => {setScreeningPage(1)}}
          >
            Get Started
          </Button>
        </Container>
      );      
    } else {
      let questionPageNum = pageNumber - 1;
      let isLastQuestionPage = questionPageNum === (screening.questionPages.length - 1);
      let questionPage = screening.questionPages[questionPageNum];
      return (
        <Container className={classes.content}>
          <Container className={classes.screeningpagecontainer}>            
            <Typography className={classes.heading}>{questionPage.title}</Typography>
            {
              questionPage.description ? (
                <Typography className={classes.pagetext}>
                  {questionPage.description}
                </Typography>
              ) : ''
            }
              <List className={classes[questionPage.type + '-list']} dense={true}>
                { generateQuestionList(questionPage) }
              </List>            
          </Container>
          <Button
            variant="contained"
            color="primary"
            className={classes.screeningButton}
            onClick={() => { isLastQuestionPage ? completeScreening() : setScreeningPage(pageNumber + 1) }}
          >
            {
              isLastQuestionPage ? 'Done' : 'Next'
            }
          </Button>
        </Container>      
      );
    }
  }

  return (
      answers && (
      <Container className={classes.container}>
        <Container className={classes.header}>
          <Box visibility={isGoBackEnabled ? 'visible' : 'hidden'}>
            <IconButton  className={classes.iconbutton} onClick={() => {setScreeningPage(screeningPage - 1)}}>
              <ArrowBackIosIcon className={classes.icon} />
              <Typography className={classes.backbutton}>Back</Typography>
            </IconButton>
          </Box>  
          <Box visibility={isPageHeaderEnabled ? 'visible' : 'hidden'}>
            <Typography className={classes.pageheading}>{pageHeading}</Typography>
          </Box>  
          <IconButton className={classes.iconbutton} onClick={() => dispatch(setActivePage('account'))}>
          <Typography className={classes.cancelbutton}>Cancel</Typography>
          </IconButton>
        </Container>
        {getScreeningContent(screeningPage)}
      </Container>
      )
  );
};

export default Screening;
