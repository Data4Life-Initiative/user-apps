import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloseMenu } from '../../components/IconControls';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMain, setActivePage } from '../menu/menuSlice';
import GaugeChart from 'react-gauge-chart'
import { selectRiskScore, fetchRiskScore } from './riskSlice';

const borderRadius = 18;
const width = '80%';
const lineHeight = 2.2;

const Label = ({ label }) => {
  const classes = useStyle();
  return <Typography className={classes.label}>{label}</Typography>;
};

const useStyle = makeStyles({
  container: {
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontFamily: ['Arial'],
    fontSize: 30,
  },
  headingMedium: {
    fontFamily: ['Arial'],
    fontSize: 24,
  },
  headingSmall: {
    fontFamily: ['Arial'],
    fontSize: 16,
    paddingBottom: 12
  },
  guage: {
    width: 400
  },
  footer: {
    alignSelf: 'end'
  },
  spinner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 15,
    color: 'rgb(150,150,150)',
    fontFamily: ['Arial'],
    fontSize: 24,
  },
  testbutton: {
    fontSize: 14,
    lineHeight,
    width,
    marginTop: 20,
    fontFamily: ['Arial'],
    borderRadius: 18,
    // backgroundColor: 'rgb(92,200,77)',
  },

});

const RiskScore = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const risk = useSelector(selectRiskScore);

  useEffect(() => {
    dispatch(fetchRiskScore('--add access token here--'));
  }, [dispatch]);

  const { riskScore, working } = risk;

  let isHighRisk = riskScore > 5.5;
  
  let recommendation = isHighRisk ? 'Get Yourself Tested' : 'Self Quarantine';
  let recommendationDetLow = 'Based on your health profile and based on your contact tracing record, you are perceived to be at lower risk of infected.'
  let recommendationSuggestLow = 'We recommend you to stay indoors and self quarantine.';
  let recommendationDetHigh = 'Based on your health profile and based on your contact tracing record, you are perceived to be at higher risk of infected.';
  let recommendationSuggestHigh = 'We recommend you to get tested.';

  const [state, setState] = React.useState({
    riskPercent: 0
  });
  setTimeout(() => {
    setState({riskPercent: riskScore / 10});
  }, 0);

  return (
    <Container className={classes.container}>
      <CloseMenu action={() => dispatch(setActivePage('home'))} />
      {working ? (
        <Container className={classes.spinner}>
          <CircularProgress />
        </Container>
      ) : (
        <Container className={classes.content}>
          <Typography className={classes.heading}>
            RISK SCORE: {riskScore}
          </Typography>
          <Container className={classes.guage}>
            <GaugeChart 
            id="risk-score-chart" 
            nrOfLevels={5}
            percent={state.riskPercent}
            arcPadding={0}
            textColor="#000"
            hideText={true}
            cornerRadius={0}
            arcWidth={0.3}
            />
          </Container>         
          <Container className={classes.content}>
            <Label label="RECOMMENDATION:" />
            <Typography className={classes.headingMedium}>
              {recommendation}
            </Typography>
            <p/>
            <p/>
            <Container className={classes.content}>
              <Typography className={classes.headingSmall}>
                {isHighRisk ? recommendationDetHigh : recommendationDetLow}
              </Typography>
              <Typography className={classes.headingSmall}>
                {isHighRisk ? recommendationSuggestHigh : recommendationSuggestLow}
              </Typography>
              {
                isHighRisk &&
                (
                  <Button
                  variant="contained"
                  color="primary"
                  className={classes.testbutton}
                  onClick={() => {}}
                  >
                    CLICK TO REQUEST A TEST
                  </Button>      
                )
              }
            </Container>  
          </Container>   
        </Container>
      )}
    </Container>
  );
};

export default RiskScore;
