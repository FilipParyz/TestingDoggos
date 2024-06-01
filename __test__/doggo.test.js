const axios = require('axios');
const diff = require('html-diff');

// Describe the test suite
describe('API Response Comparison', () => {
  let localResponse;
  let remoteResponse;

  beforeAll(async () => {
    try {
    localResponse = await axios.get('http://127.0.0.1:5000/');
    remoteResponse = await axios.get('https://testingdoggos.pythonanywhere.com/');
    console.log('Local Response:', localResponse.data);
    console.log('Remote Response:', remoteResponse.data);
  }catch(error){
     console.error('Error fetching data:', error);
  }
});

  it('should match the snapshot for localhost and remote server', () => {
    expect(localResponse.data).toMatchSnapshot('Local Response');
    expect(remoteResponse.data).toMatchSnapshot('Remote Response');
  });

  it('should have identical responses from local and remote servers', () => {
    expect(localResponse.data).toEqual(remoteResponse.data);
  });

  it('should have a similarity of at least 20% between local and remote responses', () => {       
    const calculateCoverage = (html1, html2) => {
      console.log('HTML 1:', html1);
      console.log('HTML 2:', html2);
      const diffResult = diff(html1, html2);
      const totalLength = html1.length + html2.length;
      const diffLength = diffResult.length;
      const coverage = ((totalLength - diffLength) / totalLength) * 100;
      return coverage;
    };
  
    // Calculate the coverage
    const coverage = calculateCoverage(localResponse.data, remoteResponse.data);
    console.log(`Coverage: ${coverage}%`);
    expect(coverage).toBeGreaterThanOrEqual(20);
  });
});
