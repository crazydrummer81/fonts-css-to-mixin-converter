'use strict';


class ButtonCopy {
	constructor(text) {
		this.node = document.createElement('div');
		this.node.classList.add('button-copy');
		this.node.innerText = text.length > 20 ? text.slice(0,20) + '...' : text;
		this.node.dataset.fullText = text;

		this.node.addEventListener('click', (e) => {
			navigator.clipboard.writeText(this.node.dataset.fullText)
        .then(() => {
				console.log('Copied:', text);
				this.node.classList.add('overlayed');
            setTimeout( () => { 
					this.node.classList.remove('overlayed');
            }, 500);
        })
        .catch(err => {
            console.error('Something went wrong', err);
        });	
		});
	}
	appendTo(parentNode) {
		parentNode.append(this.node);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const key  = document.getElementById('source-text-param-key').value;

	const inputNode = document.getElementById('source-text'),
			resultNode = document.getElementById('result-text'),
			resultLabelNumberNode = document.querySelector('#result-label span');
	inputNode.value = getSourceCss();
	const sourceCss = inputNode.value;
	render();
	
	function render() {
		let resultArr = [];
		let resrultText = '';
		let fontNames = sourceCss.match(/font-family:\s*'(.*?)';/gi).map(item => {
			return item.replace(/font-family:\s*'(.*?)';/gi, '$1');
		});
		let fontSrcs = sourceCss.match(/src: url\('(.*?)'\);/gi).map(item => {
			return item.replace(/src: url\('(.*?)'\);/gi, '$1');
		});
		let fontWeights = sourceCss.match(/font-weight:\s*(.*?);/gi).map(item => {
			return item.replace(/font-weight:\s*(.*?);/gi, '$1');
		});
		let fontStyles = sourceCss.match(/font-style:\s*(.*?);/gi).map(item => {
			return item.replace(/font-style:\s*(.*?);/gi, '$1');
		});

		fontNames.forEach((item,i) => {
			resultArr.push({
				'font_name': fontNames[i],
				'file_name': fontSrcs[i],
				'weight': fontWeights[i],
				'style': fontStyles[i]
			});
		});
		console.log(resultArr);
		resultArr.forEach(item => {
			resrultText += `@include font("${item.font_name}", "${item.file_name}", "${item.weight}", "${item.style}");\n`;
		});
		resultNode.value = resrultText;
		
	};
	inputNode.addEventListener('input', render);

});

function getSourceCss() {
	return `
	@font-face {
		font-family: 'Proxima Nova Bl';
		src: url('ProximaNova-Black.eot');
		src: local('Proxima Nova Black'), local('ProximaNova-Black'),
			 url('ProximaNova-Black.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Black.woff2') format('woff2'),
			 url('ProximaNova-Black.woff') format('woff'),
			 url('ProximaNova-Black.ttf') format('truetype');
		font-weight: 900;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Th';
		src: url('ProximaNova-Extrabld.eot');
		src: local('Proxima Nova Extrabold'), local('ProximaNova-Extrabld'),
			 url('ProximaNova-Extrabld.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Extrabld.woff2') format('woff2'),
			 url('ProximaNova-Extrabld.woff') format('woff'),
			 url('ProximaNova-Extrabld.ttf') format('truetype');
		font-weight: 800;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Lt';
		src: url('ProximaNova-SemiboldIt.eot');
		src: local('Proxima Nova Semibold Italic'), local('ProximaNova-SemiboldIt'),
			 url('ProximaNova-SemiboldIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-SemiboldIt.woff2') format('woff2'),
			 url('ProximaNova-SemiboldIt.woff') format('woff'),
			 url('ProximaNova-SemiboldIt.ttf') format('truetype');
		font-weight: 600;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Th';
		src: url('ProximaNovaT-Thin.eot');
		src: local('Proxima Nova Thin'), local('ProximaNovaT-Thin'),
			 url('ProximaNovaT-Thin.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNovaT-Thin.woff2') format('woff2'),
			 url('ProximaNovaT-Thin.woff') format('woff'),
			 url('ProximaNovaT-Thin.ttf') format('truetype');
		font-weight: 100;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Lt';
		src: url('ProximaNova-Light.eot');
		src: local('Proxima Nova Light'), local('ProximaNova-Light'),
			 url('ProximaNova-Light.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Light.woff2') format('woff2'),
			 url('ProximaNova-Light.woff') format('woff'),
			 url('ProximaNova-Light.ttf') format('truetype');
		font-weight: 300;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Bl';
		src: url('ProximaNova-BlackIt.eot');
		src: local('Proxima Nova Black Italic'), local('ProximaNova-BlackIt'),
			 url('ProximaNova-BlackIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-BlackIt.woff2') format('woff2'),
			 url('ProximaNova-BlackIt.woff') format('woff'),
			 url('ProximaNova-BlackIt.ttf') format('truetype');
		font-weight: 900;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Rg';
		src: url('ProximaNova-BoldIt.eot');
		src: local('Proxima Nova Bold Italic'), local('ProximaNova-BoldIt'),
			 url('ProximaNova-BoldIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-BoldIt.woff2') format('woff2'),
			 url('ProximaNova-BoldIt.woff') format('woff'),
			 url('ProximaNova-BoldIt.ttf') format('truetype');
		font-weight: bold;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Th';
		src: url('ProximaNova-ThinIt.eot');
		src: local('Proxima Nova Thin Italic'), local('ProximaNova-ThinIt'),
			 url('ProximaNova-ThinIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-ThinIt.woff2') format('woff2'),
			 url('ProximaNova-ThinIt.woff') format('woff'),
			 url('ProximaNova-ThinIt.ttf') format('truetype');
		font-weight: 100;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Rg';
		src: url('ProximaNova-Bold.eot');
		src: local('Proxima Nova Bold'), local('ProximaNova-Bold'),
			 url('ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Bold.woff2') format('woff2'),
			 url('ProximaNova-Bold.woff') format('woff'),
			 url('ProximaNova-Bold.ttf') format('truetype');
		font-weight: bold;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Rg';
		src: url('ProximaNova-RegularIt.eot');
		src: local('Proxima Nova Regular Italic'), local('ProximaNova-RegularIt'),
			 url('ProximaNova-RegularIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-RegularIt.woff2') format('woff2'),
			 url('ProximaNova-RegularIt.woff') format('woff'),
			 url('ProximaNova-RegularIt.ttf') format('truetype');
		font-weight: normal;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Th';
		src: url('ProximaNova-ExtrabldIt.eot');
		src: local('Proxima Nova Extrabold Italic'), local('ProximaNova-ExtrabldIt'),
			 url('ProximaNova-ExtrabldIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-ExtrabldIt.woff2') format('woff2'),
			 url('ProximaNova-ExtrabldIt.woff') format('woff'),
			 url('ProximaNova-ExtrabldIt.ttf') format('truetype');
		font-weight: 800;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Rg';
		src: url('ProximaNova-Regular.eot');
		src: local('Proxima Nova Regular'), local('ProximaNova-Regular'),
			 url('ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Regular.woff2') format('woff2'),
			 url('ProximaNova-Regular.woff') format('woff'),
			 url('ProximaNova-Regular.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
  }
  
  @font-face {
		font-family: 'Proxima Nova Lt';
		src: url('ProximaNova-LightIt.eot');
		src: local('Proxima Nova Light Italic'), local('ProximaNova-LightIt'),
			 url('ProximaNova-LightIt.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-LightIt.woff2') format('woff2'),
			 url('ProximaNova-LightIt.woff') format('woff'),
			 url('ProximaNova-LightIt.ttf') format('truetype');
		font-weight: 300;
		font-style: italic;
  }
  
  @font-face {
		font-family: 'Proxima Nova Lt';
		src: url('ProximaNova-Semibold.eot');
		src: local('Proxima Nova Semibold'), local('ProximaNova-Semibold'),
			 url('ProximaNova-Semibold.eot?#iefix') format('embedded-opentype'),
			 url('ProximaNova-Semibold.woff2') format('woff2'),
			 url('ProximaNova-Semibold.woff') format('woff'),
			 url('ProximaNova-Semibold.ttf') format('truetype');
		font-weight: 600;
		font-style: normal;
  }
	`;
};

